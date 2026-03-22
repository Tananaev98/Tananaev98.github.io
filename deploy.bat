@echo off
cd /d "F:\3 Курсы\0 Веб Разработчик\12 Проекты для портфолио\3 Игра без названия\игра №2"

if errorlevel 1 (
    echo Ошибка: не удалось перейти в папку репозитория
    pause
    exit /b 1
)

echo Добавляем изменения...
git add .

echo Создаем коммит...
git commit -m "quick update"

if errorlevel 1 (
    echo Нет изменений для коммита или ошибка коммита
) else (
    echo Отправляем на сервер...
    git push origin master
)

echo Done!
pause