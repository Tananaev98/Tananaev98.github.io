$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$source = 'C:\Users\Worker\Desktop\совещание файлы\Ликвидированные контрагенты - предложение по доработке.docx'
$output = 'C:\Users\Worker\Desktop\совещание файлы\Ликвидированные контрагенты - предложение по доработке — оформлено.docx'

$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0

try {
    $doc = $word.Documents.Open($source, $false, $false)

    $replacements = [ordered]@{
        'Нашел некий сервис https://dadata.ru который позволяет пробивать контрагентов по ИНН – через api запросы.' = 'Нашёл некий сервис https://dadata.ru, который позволяет пробивать контрагентов по ИНН через API-запросы.'
        'Для проверки его работы зарегистрировался на нем:' = 'Для проверки его работы зарегистрировался на нём:'
        '          - используется для доступа к ЛК в коде не нужен' = ' — используется для доступа к ЛК, в коде не нужен'
        '           - вот это ключ, используется в коде, он выдается при регистрации.' = ' — вот это ключ, используемый в коде; он выдаётся при регистрации.'
        'И написал простенькую обработку – которая по ИНН организации должна пробивать ее данные по этому сервису:' = 'И написал простенькую обработку, которая по ИНН организации должна пробивать её данные по этому сервису:'
        'Эксперимент оказался удачным, забив ИНН одной из организаций – получил такой результат:' = 'Эксперимент оказался удачным: забив ИНН одной из организаций, получил такой результат:'
        'Т.е. мы можем получать из этого сервиса нужные нам данные по контрагентам.' = 'Т. е. мы можем получать из этого сервиса нужные нам данные по контрагентам.'
        'Развернув «Все данные» - можем получить и прочую информацию (возможно тоже полезную для других доработок):' = 'Развернув «Все данные», можем получить и прочую информацию (возможно, тоже полезную для других доработок):'
        'Зарегаться в сервисе под какой-нибудь общей почтой (мою почту ведь заблокируют если я когда-нибудь уволюсь) - Нужна информация на какую почту зарегать и кого об этом попросить.' = 'Зарегаться в сервисе под какой-нибудь общей почтой (мою почту ведь заблокируют, если я когда-нибудь уволюсь). Нужна информация, на какую почту зарегать и кого об этом попросить.'
        'В справочник «Контрагенты» Добавить новые реквизиты:' = 'В справочник «Контрагенты» добавить новые реквизиты:'
        '-Статус' = 'Статус'
        '-ДатаЛиквидации' = 'ДатаЛиквидации'
        '-ДатаПоследнейПроверкиНаЛиквидацию.' = 'ДатаПоследнейПроверкиНаЛиквидацию'
        '-НеНайденВСервисе' = 'НеНайденВСервисе'
        'Написать регл. задание (ежедневное) со следующим алгоритмом:' = 'Написать регл. задание (ежедневное) со следующим алгоритмом:'
        '-Взять всех контрагентов, у которых «ДатаПоследнейПроверкиНаЛиквидацию»' = 'Взять всех контрагентов, у которых «ДатаПоследнейПроверкиНаЛиквидацию»'
        'Была, например, больше месяца назад (Опционально)' = 'была, например, больше месяца назад (опционально)'
        'НеНайденВСервисе = Ложь (Если не найден в сервисе, то скорее всего – ИНН в карточке контрагента – не корректный, флаг позволит найти таких контрагентов и перепроверить вручную.)' = 'НеНайденВСервисе = Ложь (если не найден в сервисе, то, скорее всего, ИНН в карточке контрагента некорректный; флаг позволит найти таких контрагентов и перепроверить вручную).'
        '-Поочередно пробивать этих контрагентов через сервис.' = 'Поочерёдно пробивать этих контрагентов через сервис.'
        '(Пробивать с одного api адреса – можно максимум 10000 контрагентов в день – контрагентов у нас в базе – 120 тысяч – т.е. понадобится 12 дней чтобы перепроверить всех.)' = '(С одного API-адреса можно пробивать максимум 10 000 контрагентов в день. Контрагентов у нас в базе 120 тысяч, т. е. понадобится 12 дней, чтобы перепроверить всех.)'
        'Если успешно нашли по ИНН тогда:' = 'Если успешно нашли по ИНН, тогда:'
        'КарточкаКонтрагента. Статус' = 'КарточкаКонтрагента.Статус'
        'ДанныеИзСервиса. Статус' = 'ДанныеИзСервиса.Статус'
        'КарточкаКонтрагента. ДатаЛиквидации' = 'КарточкаКонтрагента.ДатаЛиквидации'
        'ДанныеИзСервиса. ДатаЛиквидации' = 'ДанныеИзСервиса.ДатаЛиквидации'
        'Если НЕ нашли по ИНН Тогда' = 'Если не нашли по ИНН, тогда:'
        'ИНН организации насколько мне известно всегда должен быть из 10 цифр' = 'ИНН организации, насколько мне известно, всегда должен быть из 10 цифр.'
        'контрагентов с корректных ИНН' = 'контрагентов с корректным ИНН'
        'Конечно не все из них корректны, есть с пробелами, есть просто нули – но примерно так' = 'Конечно, не все из них корректны: есть с пробелами, есть просто нули, но примерно так.'
        'Не корректных ИНН у нас 65 401 т.е. больше половины, скорее всего сервис по ним ничего не найдет:' = 'Некорректных ИНН у нас 65 401, т. е. больше половины. Скорее всего, сервис по ним ничего не найдёт:'
        'У всех тех контрагентов кого не сможет пробить сервис будет два признака' = 'У всех тех контрагентов, которых не сможет пробить сервис, будет два признака:'
        'А дополнительно на форму контрагента можно вывести ниже ИНН:' = 'А дополнительно на форму контрагента можно вывести ниже ИНН:'
        '-ДатаПроверкиНаЛиквидацию.' = 'ДатаПроверкиНаЛиквидацию'
        '-Кнопку «Выполнить проверку на ликвидацию» - которая будет:' = 'Кнопку «Выполнить проверку на ликвидацию», которая будет:'
        '* Проверять что ИНН = 10 символам (если нет, то отказ с сообщением чтобы не тратить   лимиты)' = 'Проверять, что ИНН состоит из 10 символов (если нет, то отказ с сообщением, чтобы не тратить лимиты).'
        '*Пробивать текущего контрагента в сервисе:' = 'Пробивать текущего контрагента в сервисе:'
        '- Если найден обновление полей в карточке и сообщение' = 'Если найден — обновление полей в карточке и сообщение.'
        '- Если не найден – сообщение о том что по ИНН не найден' = 'Если не найден — сообщение о том, что по ИНН не найден.'
        'На основе этого можно будет построить отчет с такими контрагентами, для ручной обработки.' = 'На основе этого можно будет построить отчёт с такими контрагентами для ручной обработки.'
        'Информативный отчет с контрагентами, которых невозможно пробить по сервису (для ручной отработки)' = 'Информативный отчёт с контрагентами, которых невозможно пробить по сервису (для ручной отработки).'
        'Механизм, который периодически проверяет на ликвидацию контрагентов' = 'Механизм, который периодически проверяет на ликвидацию контрагентов.'
        'Инструмент на форме контрагента – который позволит в ручном режиме пробивать контрагента на ликвидацию.' = 'Инструмент на форме контрагента, который позволит в ручном режиме пробивать контрагента на ликвидацию.'
    }

    foreach ($entry in $replacements.GetEnumerator()) {
        $range = $doc.Content
        $find = $range.Find
        $find.ClearFormatting()
        $find.Replacement.ClearFormatting()
        $find.Text = $entry.Key
        $find.Replacement.Text = $entry.Value
        $find.Forward = $true
        $find.Wrap = 1
        $find.Format = $false
        $find.MatchCase = $true
        $find.MatchWildcards = $false
        [void]$find.Execute($entry.Key, $true, $false, $false, $false, $false, $true, 1, $false, $entry.Value, 2)
    }

    # Удаляем служебные косые черты возле скриншотов, не затрагивая URL.
    foreach ($index in @(11, 13, 19, 62, 66, 88)) {
        $range = $doc.Paragraphs.Item($index).Range.Duplicate
        $find = $range.Find
        $find.Text = '/'
        $find.Replacement.Text = ''
        $find.Forward = $true
        $find.Wrap = 0
        $find.MatchWildcards = $false
        [void]$find.Execute('/', $false, $false, $false, $false, $false, $true, 0, $false, '', 2)
    }

    # Единые параметры страницы.
    foreach ($section in $doc.Sections) {
        $section.PageSetup.TopMargin = $word.CentimetersToPoints(2)
        $section.PageSetup.BottomMargin = $word.CentimetersToPoints(2)
        $section.PageSetup.LeftMargin = $word.CentimetersToPoints(2)
        $section.PageSetup.RightMargin = $word.CentimetersToPoints(2)
    }

    # Базовая типографика.
    $doc.Content.Font.Name = 'Arial'
    $doc.Content.Font.NameFarEast = 'Arial'
    $doc.Content.Font.Size = 11
    $doc.Content.Font.Color = 0

    foreach ($paragraph in $doc.Paragraphs) {
        $paragraph.Format.Alignment = 0
        $paragraph.Format.LineSpacingRule = 0
        $paragraph.Format.SpaceBefore = 0
        $paragraph.Format.SpaceAfter = 6
        $paragraph.Format.WidowControl = -1
    }

    # Вводный абзац и смысловые разделы.
    $doc.Paragraphs.Item(2).Range.Font.Bold = $true
    $doc.Paragraphs.Item(2).Range.Font.Size = 12
    $doc.Paragraphs.Item(2).Range.Font.Color = 8276015

    foreach ($index in @(21, 28, 39, 60, 65, 67, 77, 91)) {
        $paragraph = $doc.Paragraphs.Item($index)
        $paragraph.Range.Font.Bold = $true
        $paragraph.Range.Font.Size = 12
        $paragraph.Range.Font.Color = 8276015
        $paragraph.Format.SpaceBefore = 12
        $paragraph.Format.SpaceAfter = 6
        $paragraph.Format.KeepWithNext = $true
    }

    # Данные доступа оформляем как компактный технический блок.
    foreach ($index in 5..8) {
        $paragraph = $doc.Paragraphs.Item($index)
        $paragraph.Range.Font.Name = 'Consolas'
        $paragraph.Range.Font.Size = 9.5
        $paragraph.Format.LeftIndent = $word.CentimetersToPoints(0.5)
        $paragraph.Format.RightIndent = $word.CentimetersToPoints(0.5)
        $paragraph.Shading.BackgroundPatternColor = 15790320
    }

    # Реквизиты и итоговые результаты — маркированные списки.
    foreach ($index in @(30, 31, 32, 33, 79, 80, 81, 82, 83, 84, 85, 86, 87, 92, 93, 94)) {
        $paragraph = $doc.Paragraphs.Item($index)
        $paragraph.Range.ListFormat.ApplyBulletDefault()
        $paragraph.Format.LeftIndent = $word.CentimetersToPoints(0.75)
        $paragraph.Format.FirstLineIndent = $word.CentimetersToPoints(-0.35)
        $paragraph.Format.SpaceAfter = 3
    }

    # Алгоритм и псевдокод.
    foreach ($index in @(41, 42, 43, 44, 46, 47)) {
        $paragraph = $doc.Paragraphs.Item($index)
        $paragraph.Format.LeftIndent = $word.CentimetersToPoints(0.75)
        $paragraph.Format.SpaceAfter = 3
    }
    foreach ($index in @(49, 50, 51, 52, 54, 55, 56, 57, 58, 68, 69, 70)) {
        $paragraph = $doc.Paragraphs.Item($index)
        $paragraph.Range.Font.Name = 'Consolas'
        $paragraph.Range.Font.Size = 9.5
        $paragraph.Format.LeftIndent = $word.CentimetersToPoints(1)
        $paragraph.Format.RightIndent = $word.CentimetersToPoints(0.5)
        $paragraph.Format.SpaceAfter = 2
        $paragraph.Shading.BackgroundPatternColor = 16119285
    }

    # Скриншоты без изменения размера или содержимого.
    foreach ($index in @(13, 19, 62, 66, 88)) {
        $doc.Paragraphs.Item($index).Format.Alignment = 1
        $doc.Paragraphs.Item($index).Format.SpaceBefore = 6
        $doc.Paragraphs.Item($index).Format.SpaceAfter = 10
    }

    # Убираем случайные лишние пустые интервалы.
    foreach ($paragraph in $doc.Paragraphs) {
        $plain = $paragraph.Range.Text.Replace("`r", '').Replace("`a", '').Trim()
        if ($plain.Length -eq 0 -and $paragraph.Range.InlineShapes.Count -eq 0) {
            $paragraph.Format.SpaceAfter = 0
            $paragraph.Format.LineSpacingRule = 0
        }
    }

    $doc.SaveAs2($output, 16)
    $doc.Close(0)
    Write-Output $output
}
finally {
    if ($doc) {
        try { $doc.Close(0) } catch {}
        [void][Runtime.InteropServices.Marshal]::ReleaseComObject($doc)
    }
    $word.Quit()
    [void][Runtime.InteropServices.Marshal]::ReleaseComObject($word)
    [GC]::Collect()
    [GC]::WaitForPendingFinalizers()
}
