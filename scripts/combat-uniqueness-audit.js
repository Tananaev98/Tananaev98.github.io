// A structural audit, not a fun score. No copied combat or damage formulas.
'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const {designs}=require('./combat-designs');
const bosses=[],levels=[];
const stable=x=>JSON.stringify(x);
function bagSimilarity(a,b) {
    const counts=xs=>{const m=new Map();xs.forEach(x=>m.set(x,(m.get(x)||0)+1));return m;};
    const aa=counts(a),bb=counts(b);let intersection=0,union=0;
    for(const k of new Set([...aa.keys(),...bb.keys()])) {
        intersection+=Math.min(aa.get(k)||0,bb.get(k)||0);
        union+=Math.max(aa.get(k)||0,bb.get(k)||0);
    }
    return union?intersection/union:0;
}
for(let n=1;n<=74;n++) {
    const box={};
    vm.runInNewContext(fs.readFileSync(path.join(root,`lvlData/gameData${n}.js`),'utf8')+
        ';this.d={bossCombatConfig,bossAbilities,bossAbilitiesDop,ENEMY_TYPES};',box);
    const d=box.d,rows=[];
    for(let i=1;i<=5;i++) {
        const role='enem'+i,attacks=d.bossAbilities.filter(a=>a.boss===role),combos=d.bossAbilitiesDop.filter(c=>c.boss===role);
        const kind=c=>d.bossCombatConfig.attackChains&&c.isChain?'chain':c.indexAbilities.some(j=>attacks[j].barricadeHits)?'barricade':'ordinary';
        // Deliberately coarse: mirror images and small coordinate/speed edits are not novelty.
        const tokens=mirror=>combos.map(c=>stable([kind(c),c.minPhase||1,c.indexAbilities.map(j=>{
            const a=attacks[j],x=mirror?100-a.xPos:a.xPos;
            return [x<33?'L':x>67?'R':'C',a.yPos<=15?'high':a.yPos<=35?'middle':'low',
                a.customSpeed<=10?'slow':a.customSpeed<20?'medium':'fast',a.barricadeHits||0];
        })])).sort();
        const signatures=combos.filter(c=>c.signature);
        // Canonicalize slot identities by first appearance, not by authored names or offsets.
        const seen=new Map();
        const recipe=signatures.length?stable(signatures.map(c=>[c.minPhase||1,c.indexAbilities.map(j=>{
            if(!seen.has(j))seen.set(j,seen.size);
            return [seen.get(j),attacks[j].yPos,attacks[j].customSpeed];
        }),c.shotDelayMs||null,c.shotGapsMs||null,c.recoveryMs||null])):null;
        const profile=d.bossCombatConfig.bosses[role];
        const row={level:n,role,name:d.ENEMY_TYPES[role].dispName,movement:profile.movementStyle,
            family:designs[n]?.[i-1]?.kind||null,recipe,signatureCount:signatures.length,
            normal:tokens(false),mirror:tokens(true),combos:combos.length,
            retainedOrdinary:combos.filter(c=>!c.signature&&kind(c)==='ordinary').length};
        bosses.push(row);rows.push(row);
    }
    levels.push({level:n,bosses:rows});
}
const recipes=new Map(),families=new Map();
for(const b of bosses) {
    if(b.recipe){if(!recipes.has(b.recipe))recipes.set(b.recipe,[]);recipes.get(b.recipe).push(b);}
    if(b.family){if(!families.has(b.family))families.set(b.family,[]);families.get(b.family).push(b);}
    let nearest=null;
    for(const other of bosses) {
        if(other.level===b.level)continue;
        const score=Math.max(bagSimilarity(b.normal,other.normal),bagSimilarity(b.normal,other.mirror));
        if(!nearest||score>nearest.similarity)nearest={level:other.level,role:other.role,name:other.name,
            similarity:score,sameMovement:b.movement===other.movement};
    }
    b.nearest=nearest;
}
const summary={levels:levels.length,bosses:bosses.length,modifiedBosses:bosses.filter(b=>b.recipe).length,
    signatureRecipes:recipes.size,declaredFamilies:families.size,
    familyCounts:Object.fromEntries([...families].map(([k,bs])=>[k,bs.length])),
    normalizedWholeSetDuplicates:bosses.filter(b=>b.nearest.similarity===1).length,
    normalizedSimilarityAtLeastHalf:bosses.filter(b=>b.nearest.similarity>=.5).length};
const lines=['# Самопроверка уникальности всех 74 уровней','',
    '**Вывод: нет, индивидуальность всех боёв не достигнута.** Предыдущие правки устранили точные копии наборов, но распространили девять рецептов новых серий на 265 противников. Различие координат, названий и небольших интервалов не доказывает новое решение для игрока.','',
    'Это проверка текущих исполняемых данных всех 370 противников. Не человеческий плейтест. Честность, отсутствие ошибок и уникальность — разные критерии.','',
    '## Метод','',
    '1. Новые сигнатуры сравниваются без имён, абсолютных номеров способностей и X-координат: сохраняются повторное обращение к той же цели/слоту, порядок, высота, скорость, доступность по фазе, шаг и паузы. Такое совпадение означает общий рецепт; движение и горизонтальная геометрия могут отличаться.',
    '2. Полный набор каждого босса сравнивается со всеми противниками других уровней. Координаты сводятся к трём полосам и трём высотам, скорости — к медленной/средней/быстрой. Сохраняются порядок атак, цепи, баррикады и фазы. Зеркальность не считается новизной. Сходство — доля совпадающих серий в объединении двух мультимножеств (Jaccard). Это индикатор для ручной проверки, не процент одинакового игрового опыта.',
    '3. Для ближайшего соседа отдельно указан одинаковый/разный movementStyle. Точный ритм волн и фактическая траектория не входят в этот грубый отпечаток; малое сходство также не доказывает уникальность.','',
    '## Повтор новых приёмов','',
    `Проверено ${summary.levels} уровня / ${summary.bosses} противников. Новые сигнатуры есть у ${summary.modifiedBosses}; разных рецептов без X — ${summary.signatureRecipes}.`,'',
    '| Семейство | Противников | Уровни |','|---|---:|---|'];
for(const [family,bs] of families)lines.push(`| ${family} | ${bs.length} | ${[...new Set(bs.map(b=>b.level))].join(', ')} |`);
lines.push('','## Каждый уровень','',
    '«Шаблонная правка» означает повтор нового рецепта в других уровнях, а не доказанную идентичность всего уровня. «Не доказано» означает, что индивидуальность целого боя нельзя подтвердить только этими метриками. Проценты ниже относятся только к грубому сравнению полных наборов.','',
    '| Уровень | Новые семейства в порядке пяти противников | Ближайшие совпадения для каждого противника | Вердикт |',
    '|---|---|---|---|');
for(const l of levels)lines.push(`| ${l.level} | ${l.bosses.map(b=>b.family||'—').join(' / ')} | ${l.bosses.map(b=>`${b.role} → ${b.nearest.level}/${b.nearest.role}: ${Math.round(b.nearest.similarity*100)}%${b.nearest.sameMovement?' (то же движение)':''}`).join('; ')} | ${l.bosses.some(b=>b.recipe)?'Новые приёмы шаблонны; уникальность целого боя не доказана':'Новых сигнатур нет; уникальность не доказана'} |`);
lines.push('','## Проверенные вручную примеры','',
    '- **39/enem5, Щучья Ведьма → 40/enem5, Разъярённый Водяной.** Первый новый рисунок X: 88→66→51 и 86→64→51. Высоты 12→20→12 и скорости 16→14→18 одинаковы. Оба используют wave, одинаковые speedMultiplier=1.15 и speedVariance; шаг новых серий 360 мс, паузы 650/650/950 мс. Разница нескольких процентов ширины поля не создаёт нового решения. Телеграфы и общий темп слегка отличаются.',
    '- **37/enem1, Клешнач → 38/enem3, Глубинник.** Новый рисунок 20→38→51 и 24→40→53, те же высоты и скорости, оба wave. Основной приём — тот же крюк с возвратом, хотя названия привязаны к разным образам.',
    '- **17/enem3, Столбик → 20/enem4, Клохтун.** Оба lateRush; новые серии: двойной удар в одну полосу, затем та же пара с добавлением противоположного фланга. Темп и коэффициенты скорости заметно различаются, поэтому сложность различна, но сам новый приём повторён.',
    `- ${summary.normalizedWholeSetDuplicates} противников имеют полное совпадение грубого отпечатка с другим уровнем; это пять пар в текущем наборе. ${summary.normalizedSimilarityAtLeastHalf} имеют ближайшего соседа со сходством не ниже 50%. Эти числа не означают столько же полностью одинаковых боёв.`,
    '','## Что следует исправить в подходе','',
    '- Разрабатывать приём от конкретной механики персонажа, а не назначать ему один из девяти типов с новым именем.',
    '- Проверять основной выбор игрока: какую цель трогать первой, где удерживать прицел, какой сигнал меняет решение. Изменение X без изменения ответа не считать новым боем.',
    '- Различать собственный приём, учебное повторение и экзамен. Повтор допустим, если его роль намеренна и задокументирована.',
    '- Проверять общий сценарий пяти встреч: три одинаково устроенные сигнатуры с одинаковым открытием по HP-фазам сами становятся кампанийным шаблоном.',
    '- Сохранять защитные интервалы и ограничения наложений независимо от художественного разнообразия.','');
const out=path.join(root,'description/игра №2 доп материалы');
fs.writeFileSync(path.join(out,'самопроверка уникальности 1-74.md'),lines.join('\n'));
fs.writeFileSync(path.join(out,'самопроверка уникальности 1-74.json'),stable({summary,levels:levels.map(l=>({level:l.level,bosses:l.bosses.map(({normal,mirror,recipe,...b})=>({...b,recipePeers:recipe?recipes.get(recipe).length-1:0}))}))}));
console.log(JSON.stringify(summary,null,2));
console.log('Most similar cross-level whole sets:');
console.log(bosses.filter(b=>b.nearest.level<b.level).sort((a,b)=>b.nearest.similarity-a.nearest.similarity).slice(0,15).map(b=>`${b.level}/${b.role} ${b.name} -> ${b.nearest.level}/${b.nearest.role} ${b.nearest.name}: ${Math.round(100*b.nearest.similarity)}%, movement ${b.nearest.sameMovement?'same':'different'}`).join('\n'));
