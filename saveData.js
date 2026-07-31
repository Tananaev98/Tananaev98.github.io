// ==================== Сохранение и загрузка прогресса ====================

const GAME_STATE_STORAGE_KEY = 'gameState';
const GAME_STATE_VERSION = 1;
const DEBUG_UNLOCK_SECRET = 'tda98';
const DEBUG_ZLATA_REWARD = 10_000_000;

// 1. Инициализация прогресса
let gameState = createGameState();

function isPlainObject(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function readStoredGameState() {
    try {
        const saved = localStorage.getItem(GAME_STATE_STORAGE_KEY);
        if (!saved) return null;

        const parsed = JSON.parse(saved);
        if (!isPlainObject(parsed)) {
            console.warn('Сохранение имеет неверный формат. Создан новый прогресс.');
            return null;
        }
        return parsed;
    } catch (error) {
        console.warn('Не удалось прочитать сохранение. Создан новый прогресс.', error);
        return null;
    }
}

function persistGameState(state) {
    try {
        localStorage.setItem(GAME_STATE_STORAGE_KEY, JSON.stringify(state));
        return true;
    } catch (error) {
        console.error('Не удалось сохранить игровой прогресс.', error);
        return false;
    }
}

function migrateGameState(savedState) {
    const defaults = getDefaultGameState();
    if (!isPlainObject(savedState)) return defaults;

    const migrated = { ...defaults, ...savedState };
    migrated.schemaVersion = GAME_STATE_VERSION;
    migrated.lastCompletedLevel = Number.isFinite(savedState.lastCompletedLevel)
        ? Math.max(0, Math.floor(savedState.lastCompletedLevel))
        : defaults.lastCompletedLevel;
    migrated.skillPoints = Number.isFinite(savedState.skillPoints)
        ? Math.max(0, savedState.skillPoints)
        : defaults.skillPoints;
    migrated.zlata = Number.isFinite(savedState.zlata)
        ? Math.max(0, savedState.zlata)
        : defaults.zlata;

    // Добавляем новых героев из текущей версии, сохраняя пользовательских из
    // старого сохранения. Отсутствующие поля героя берём из нового шаблона.
    const savedHeroes = Array.isArray(savedState.mHero)
        ? savedState.mHero.filter(heroKey => typeof heroKey === 'string')
        : [];
    migrated.mHero = [...new Set([...defaults.mHero, ...savedHeroes])];

    migrated.mHero.forEach(heroKey => {
        const defaultHero = defaults[heroKey];
        const savedHero = savedState[heroKey];

        if (isPlainObject(defaultHero)) {
            migrated[heroKey] = {
                ...defaultHero,
                ...(isPlainObject(savedHero) ? savedHero : {})
            };

            Object.keys(defaultHero).forEach(field => {
                if (typeof defaultHero[field] === 'number' && !Number.isFinite(migrated[heroKey][field])) {
                    migrated[heroKey][field] = defaultHero[field];
                }
            });
        } else if (!isPlainObject(savedHero)) {
            delete migrated[heroKey];
        }
    });

    const savedTimes = isPlainObject(savedState.levelTimes) ? savedState.levelTimes : {};
    migrated.levelTimes = {};
    Object.entries(savedTimes).forEach(([level, time]) => {
        const levelNumber = Number(level);
        if (Number.isInteger(levelNumber) && levelNumber > 0 && Number.isFinite(time) && time >= 0) {
            migrated.levelTimes[levelNumber] = time;
        }
    });

    if (typeof migrated.activeHero !== 'string' || !isPlainObject(migrated[migrated.activeHero])) {
        migrated.activeHero = defaults.activeHero;
    }

    return migrated;
}

// 2. Сохранение
function saveGameState() {
    return persistGameState(gameState);
}

// 3. Безопасное чтение без изменения текущего gameState
function loadGameState() {
    const saved = readStoredGameState();
    return saved ? migrateGameState(saved) : null;
}

// 4. Очистка (для отладки)
function clearGameState() {
    try {
        localStorage.removeItem(GAME_STATE_STORAGE_KEY);
        return true;
    } catch (error) {
        console.error('Не удалось очистить игровой прогресс.', error);
        return false;
    }
}

function unlockAllLevelsForDebug(secret, maxAvailableLevel) {
    if (secret !== DEBUG_UNLOCK_SECRET) {
        return { success: false, reason: 'invalid-secret' };
    }

    const normalizedMaxLevel = Number(maxAvailableLevel);
    if (!Number.isInteger(normalizedMaxLevel) || normalizedMaxLevel < 1) {
        return { success: false, reason: 'invalid-level-count' };
    }

    const previousCompletedLevel = gameState.lastCompletedLevel;
    const previousZlata = gameState.zlata;

    gameState.lastCompletedLevel = Math.max(gameState.lastCompletedLevel, normalizedMaxLevel);
    gameState.zlata += DEBUG_ZLATA_REWARD;

    if (!saveGameState()) {
        gameState.lastCompletedLevel = previousCompletedLevel;
        gameState.zlata = previousZlata;
        return { success: false, reason: 'save-failed' };
    }

    return {
        success: true,
        unlockedThrough: normalizedMaxLevel,
        reward: DEBUG_ZLATA_REWARD,
        totalZlata: gameState.zlata
    };
}

// 5. Обновление уровня
function completeLevel() {
	
	saveLevelTime(lvlNumber, timeSec2);
    if (lvlNumber > gameState.lastCompletedLevel) {
        gameState.lastCompletedLevel = lvlNumber;

		if (typeof levelCompletionConfig !== 'undefined' && levelCompletionConfig.isRegionFinal) {
			const completionMessage = levelCompletionConfig.completionMessage || 'Область пройдена!';
			rowTotal = rowTotal + `<div class="time-line">${completionMessage}</div>`;
		} else {
			rowTotal = rowTotal + `<div class="time-line">Разблокирован уровень ${lvlNumber+1}!</div>`;
		}
        
        gameState.mHero.forEach(heroKey => {
            const hero = gameState[heroKey];
            if (!hero) return;
            
            if (hero.lvlUnlock <= lvlNumber && hero.unlock == false) {
                hero.unlock = true;
				rowTotal = rowTotal + `<div class="time-line">Разблокирован новый герой — ${hero.dispName}!</div>`;	
            }
        }); // Добавлена закрывающая скобка
        
        saveGameState();
    }
}

function addZlat(zlatP) {
   
		gameState.zlata = gameState.zlata + zlatP;       
        saveGameState();
		
}

function heroUp(heroName, infoMode) {
    const originalHero = gameState[heroName];
    if (!originalHero) {
        console.log('Герой с таким именем не найден:', heroName);
        return;
    }

    // Если infoMode, создаём глубокую копию (не трогаем оригинал)
    const hero = infoMode ? JSON.parse(JSON.stringify(originalHero)) : originalHero;

    // Применяем улучшения (копию или оригинал)
    if (hero.upSpecif === 1) {
        hero.startGlobalDamage += hero.startGlobalDamage * 0.03;
        hero.startGlobalCritChance += 0.01;
        hero.upSpecif = 2;
    } else if (hero.upSpecif === 2) {
        hero.startGlobalCritMultiplier += 0.1;
        hero.startGlobalWoundChance += 0.01;
        hero.upSpecif = 3;
    } else if (hero.upSpecif === 3) {
        hero.startSHOT_INTERVAL -= 1;
        hero.upSpecif = 4;
    } else if (hero.upSpecif === 4) {
        hero.castleHP += Math.floor(hero.castleHP * 0.05);      // +5% HP
        hero.startCastleDamageReduction = hero.startCastleDamageReduction + 0.01; 
        hero.upSpecif = 1;
    }

    // Если не infoMode, сохраняем изменения в оригинале
    if (!infoMode) {
		gameState.zlata = gameState.zlata -hero.zlataUp;
		hero.level++;
        hero.zlataUp = Math.floor(hero.zlataUp * 1.11);
        saveGameState();
        return;
    } else {
        // infoMode: возвращаем копию с изменениями
        return hero;
    }
}


function saveLevelTime(level, timeInSeconds) {
	
	const currentTime = gameState.levelTimes[level];
	
	let updRecord = false;
	
	// если записи нет — добавляем
	if (currentTime === undefined) {
		updRecord = true;
		gameState.levelTimes[level] = timeInSeconds;
	}

	// если новое время меньше старого — обновляем
	if (timeInSeconds < currentTime) {
		updRecord = true;
		gameState.levelTimes[level] = timeInSeconds;
		//выводим предыдущее время:
		rowTotal = rowTotal + `<div class="time-line">Лучшее время: <span>${formatTime(currentTime)}</span></div>`;
	}
	

	//если рекород не побит то на этом заканчиваем
	if (!updRecord) {return}

	//если рекород побит то:
	// считаем общую сумму
	let totalScore = 0;

	for (const lvl in gameState.levelTimes) {
		const time = gameState.levelTimes[lvl];

		// 1000 - время, но не меньше 0
		const value = Math.max(0, 600 - time);

		totalScore += value;
	}
	
	const skillPoints = totalScore - gameState.skillPoints;
	
	if (skillPoints > 0) {
		rowTotal = rowTotal + `<div class="time-line">Рекорд побит — очки мастерства: +${skillPoints}!</div>`;
		gameState.skillPoints = gameState.skillPoints+skillPoints;
		saveGameState();
	}
	
}

function createGameState() {
    const savedState = readStoredGameState();
    const initialState = migrateGameState(savedState);

    // Сразу записываем результат миграции: так новые поля появятся в старом
    // сохранении, а повреждённое значение будет заменено рабочим шаблоном.
    persistGameState(initialState);
    return initialState;
}

function getDefaultGameState() {
    return {
			schemaVersion: GAME_STATE_VERSION,
			lastCompletedLevel: 0,			
			levelTimes: {
	          },
			skillPoints: 0,			  
			mHero: ['eremei', 'dunya', 'luka', 'kim', 'vas', 'gen', 'gm', 'kir', 'gam', 'gama','gamb','gamc', 'gamd','game','gamf', 'gamg', 'gamh', ],
			activeHero: 'eremei',
			zlata: 0, 
			eremei: {
				name: 'eremei', 
				dispName: 'Еремей Дуболом',
				image: 'images/hero/2_eremei/eremei_min.png',
				fullImage: 'images/hero/2_eremei/eremei_full.png',
				level: 1,
				startGlobalDamage: 88,
				startGlobalCritChance: 0.03,
				startGlobalCritMultiplier: 2.1,
				startGlobalWoundChance	: 0.01,
				startCastleDamageReduction : 0.05,
				startSHOT_INTERVAL : 970,
				castleHP : 125,
				lvlUnlock: 1,
				zlataUp: 10,
				upSpecif: 1, 	
				feature: 'Отбивальщик - <br>каждая заблокированная <br> атака увеличивает урон <br> на 0,25% вплоть до 25%',
				unlock: true, 
				maxDamageBonusPercentSize: 0.25,
				DamageBonusPercentSize: 0.0025,
			},
			
			
			dunya: {
				name: 'dunya', 
				dispName: 'Ветроманка Дуня',
				image: 'images/hero/1_babka/dunya_min.png',
				fullImage: 'images/hero/1_babka/dunya_full.png',
				level: 1,
				startGlobalDamage: 75,
				startGlobalCritChance: 0.02,
				startGlobalCritMultiplier: 2.0,
				startGlobalWoundChance	: 0.01,
				startCastleDamageReduction : 0.02,
				startSHOT_INTERVAL : 940,
				castleHP : 80,
				lvlUnlock: 2,
				zlataUp: 10,
				upSpecif: 1, 
				unlock: true,
				feature: 'Раскрутилась - <br>10% шанс двойной атаки<br> 5% шанс тройной атаки <br> 1% шанс Четверной атаки', 
			},
			
			luka: {
				name: 'luka', 
				dispName: 'Лука стрелок',
				image: 'images/hero/3_luka/luka_min.png',
				fullImage: 'images/hero/3_luka/luka_full.png',
				level: 1,
				startGlobalDamage: 55,
				startGlobalCritChance: 0.01,
				startGlobalCritMultiplier: 1.6,
				startGlobalWoundChance	: 0.02,
				startCastleDamageReduction : 0.01,
				startSHOT_INTERVAL : 870,
				castleHP : 50,
				lvlUnlock: 3,
				zlataUp: 10,
				upSpecif: 1,
				unlock: true,
				feature: 'Считалочка - <br>каждая 5-я атака <br>всегда критическая', 
			},
			
			kim: {
				name: 'luka', 
				dispName: 'Лука стрелок',
				image: 'images/hero/3_luka/luka_min.png',
				startGlobalDamage: 300,
				startGlobalCritChance: 0.25,
				startGlobalCritMultiplier: 1.8,
				startGlobalWoundChance	: 0.1,
				startCastleDamageReduction : 0.01,
				startSHOT_INTERVAL : 360,
				castleHP : 50,
				lvlUnlock: 30,
				unlock: false,
			},
			
			
			vas: {
				name: 'luka', 
				dispName: 'Лука стрелок',
				image: 'images/hero/3_luka/luka_min.png',
				startGlobalDamage: 25,
				startGlobalCritChance: 0.25,
				startGlobalCritMultiplier: 1.8,
				startGlobalWoundChance	: 0.1,
				startCastleDamageReduction : 0.01,
				startSHOT_INTERVAL : 360,
				castleHP : 50,
				lvlUnlock: 40,
				unlock: false,
			},
			
			
			gen: {
				name: 'luka', 
				dispName: 'Лука стрелок',
				image: 'images/hero/3_luka/luka_min.png',
				startGlobalDamage: 25,
				startGlobalCritChance: 0.25,
				startGlobalCritMultiplier: 1.8,
				startGlobalWoundChance	: 0.1,
				startCastleDamageReduction : 0.01,
				startSHOT_INTERVAL : 360,
				castleHP : 50,
				lvlUnlock: 50,
				unlock: false,
			},
			
			gm: {
				name: 'luka', 
				dispName: 'Лука стрелок',
				image: 'images/hero/3_luka/luka_min.png',
				startGlobalDamage: 25,
				startGlobalCritChance: 0.25,
				startGlobalCritMultiplier: 1.8,
				startGlobalWoundChance	: 0.1,
				startCastleDamageReduction : 0.01,
				startSHOT_INTERVAL : 360,
				castleHP : 50,
				lvlUnlock: 60,
				unlock: false,
			},
			
			kir: {
				name: 'luka', 
				dispName: 'Лука стрелок',
				image: 'images/hero/3_luka/luka_min.png',
				startGlobalDamage: 25,
				startGlobalCritChance: 0.25,
				startGlobalCritMultiplier: 1.8,
				startGlobalWoundChance	: 0.1,
				startCastleDamageReduction : 0.01,
				startSHOT_INTERVAL : 360,
				castleHP : 50,
				lvlUnlock: 70,
				unlock: false,
			},
			
			gam: {
				name: 'luka', 
				dispName: 'Лука стрелок',
				image: 'images/hero/3_luka/luka_min.png',
				startGlobalDamage: 25,
				startGlobalCritChance: 0.25,
				startGlobalCritMultiplier: 1.8,
				startGlobalWoundChance	: 0.1,
				startCastleDamageReduction : 0.01,
				startSHOT_INTERVAL : 360,
				castleHP : 50,
				lvlUnlock: 80,
				unlock: false,
			},
			
			gama: {
				name: 'luka', 
				dispName: 'Лука стрелок',
				image: 'images/hero/3_luka/luka_min.png',
				startGlobalDamage: 25,
				startGlobalCritChance: 0.25,
				startGlobalCritMultiplier: 1.8,
				startGlobalWoundChance	: 0.1,
				startCastleDamageReduction : 0.01,
				startSHOT_INTERVAL : 360,
				castleHP : 50,
				lvlUnlock: 90,
				unlock: false,
			},
			
			gamb: {
				name: 'luka', 
				dispName: 'Лука стрелок',
				image: 'images/hero/3_luka/luka_min.png',
				startGlobalDamage: 25,
				startGlobalCritChance: 0.25,
				startGlobalCritMultiplier: 1.8,
				startGlobalWoundChance	: 0.1,
				startCastleDamageReduction : 0.01,
				startSHOT_INTERVAL : 360,
				castleHP : 50,
				lvlUnlock: 100,
				unlock: false,
			},
			
			gamc: {
				name: 'luka', 
				dispName: 'Лука стрелок',
				image: 'images/hero/3_luka/luka_min.png',
				startGlobalDamage: 25,
				startGlobalCritChance: 0.25,
				startGlobalCritMultiplier: 1.8,
				startGlobalWoundChance	: 0.1,
				startCastleDamageReduction : 0.01,
				startSHOT_INTERVAL : 360,
				castleHP : 50,
				lvlUnlock: 110,
				unlock: false,
			},
			
			gamd: {
				name: 'luka', 
				dispName: 'Лука стрелок',
				image: 'images/hero/3_luka/luka_min.png',
				startGlobalDamage: 25,
				startGlobalCritChance: 0.25,
				startGlobalCritMultiplier: 1.8,
				startGlobalWoundChance	: 0.1,
				startCastleDamageReduction : 0.01,
				startSHOT_INTERVAL : 360,
				castleHP : 50,
				lvlUnlock: 120,
				unlock: false,
			},
			
			gamf: {
				name: 'luka', 
				dispName: 'Лука стрелок',
				image: 'images/hero/3_luka/luka_min.png',
				startGlobalDamage: 25,
				startGlobalCritChance: 0.25,
				startGlobalCritMultiplier: 1.8,
				startGlobalWoundChance	: 0.1,
				startCastleDamageReduction : 0.01,
				startSHOT_INTERVAL : 360,
				castleHP : 50,
				lvlUnlock: 130,
				unlock: false,
			},
			
			gamg: {
				name: 'luka', 
				dispName: 'Лука стрелок',
				image: 'images/hero/3_luka/luka_min.png',
				startGlobalDamage: 25,
				startGlobalCritChance: 0.25,
				startGlobalCritMultiplier: 1.8,
				startGlobalWoundChance	: 0.1,
				startCastleDamageReduction : 0.01,
				startSHOT_INTERVAL : 360,
				castleHP : 50,
				lvlUnlock: 140,
				unlock: false,
			},
			
			gamh: {
				name: 'luka', 
				dispName: 'Лука стрелок',
				image: 'images/hero/3_luka/luka_min.png',
				startGlobalDamage: 25,
				startGlobalCritChance: 0.25,
				startGlobalCritMultiplier: 1.8,
				startGlobalWoundChance	: 0.1,
				startCastleDamageReduction : 0.01,
				startSHOT_INTERVAL : 360,
				castleHP : 50,
				lvlUnlock: 141,
				unlock: false,
			},
				
			}; // дефолт
}
