// ==================== Сохранение и загрузка прогреса ====================


// 1. Инициализация прогресса
let gameState = createGameState();

// 2. Сохранение
function saveGameState() {
    localStorage.setItem('gameState', JSON.stringify(gameState));
}

// 3. Загрузка (чтение без изменения gameState)
function loadGameState() {
    const saved = localStorage.getItem('gameState');
    if (saved) {
        return JSON.parse(saved);
    }
    return null;
}

// 4. Очистка (для отладки)
function clearGameState() {
    localStorage.removeItem('gameState');
}

// 5. Обновление уровня
function completeLevel() {
    if (lvlNumber > gameState.lastCompletedLevel) {
        gameState.lastCompletedLevel = lvlNumber;
        saveGameState();
    }
}

// 6. Создание/инициализация прогресса
function createGameState() {
    const saved = localStorage.getItem('gameState');
    if (saved) {
        return JSON.parse(saved); // читаем из localStorage
    } else {
        const defaultState = {
			lastCompletedLevel: 0,
			mHero: ['eremei', 'dunya', 'luka', 'kim', 'vas', 'gen', 'gm', 'kir', 'gam', 'gama','gamb','gamc', 'gamd','game','gamf', 'gamg', 'gamh', ],
			activeHero: 'luka',
			eremei: {
				name: 'eremei', 
				dispName: 'Еремей Дуболом',
				image: 'images/hero/2_eremei/eremei_min.png',
				fullImage: 'images/hero/2_eremei/eremei_full.png',
				startGlobalDamage: 70,
				startGlobalCritChance: 0.01,
				startGlobalCritMultiplier: 1.8,
				startGlobalWoundChance	: 0.01,
				startCastleDamageReduction : 0.03,
				startSHOT_INTERVAL : 380,
				castleHP : 120,
				lvlUnlock: 1,
				unlock: true, 
			},
			
			
			dunya: {
				name: 'dunya', 
				dispName: 'Ветроманка Дуня',
				image: 'images/hero/1_babka/dunya_min.png',
				fullImage: 'images/hero/1_babka/dunya_full.png',
				startGlobalDamage: 60,
				startGlobalCritChance: 0.01,
				startGlobalCritMultiplier: 2.0,
				startGlobalWoundChance	: 0.01,
				startCastleDamageReduction : 0.02,
				startSHOT_INTERVAL : 360,
				castleHP : 100,
				lvlUnlock: 10,
				unlock: true,
			},
			
			luka: {
				name: 'luka', 
				dispName: 'Лука стрелок',
				image: 'images/hero/3_luka/luka_min.png',
				fullImage: 'images/hero/3_luka/luka_full.png',
				startGlobalDamage: 33,
				startGlobalCritChance: 0.03,
				startGlobalCritMultiplier: 1.6,
				startGlobalWoundChance	: 0.01,
				startCastleDamageReduction : 0.01,
				startSHOT_INTERVAL : 340,
				castleHP : 70,
				lvlUnlock: 20,
				unlock: true,
			},
			
			kim: {
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
        
		
		localStorage.setItem('gameState', JSON.stringify(defaultState));
        return defaultState;
    }
}