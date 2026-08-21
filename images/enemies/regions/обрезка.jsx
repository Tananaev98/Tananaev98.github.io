#target photoshop

app.bringToFront();

(function () {

    // ============================================
    // НАСТРОЙКИ
    // ============================================

    var WEBP_QUALITY = 72;

    // ============================================

    var rootFolder = Folder.selectDialog(
        "Выберите корневую папку с изображениями"
    );

    if (!rootFolder) {
        return;
    }

    var oldDialogs = app.displayDialogs;
    app.displayDialogs = DialogModes.NO;

    var files = [];
    var successCount = 0;
    var errors = [];

    try {

        collectWebPFiles(rootFolder, files);

        if (files.length === 0) {
            alert("В выбранной папке и подпапках не найдено .webp файлов.");
            return;
        }

        for (var i = 0; i < files.length; i++) {

            var file = files[i];

            // Показываем текущий прогресс в Photoshop
            try {
                app.statusBar =
                    "Обработка " +
                    (i + 1) +
                    " / " +
                    files.length +
                    ": " +
                    file.name;
            } catch (e) {}

            try {

                processFile(file, i);

                successCount++;

            } catch (e) {

                errors.push(
                    file.fsName +
                    "\n" +
                    e.message
                );

            }

        }

    } finally {

        app.displayDialogs = oldDialogs;

        try {
            app.statusBar = "";
        } catch (e) {}

    }

    // ============================================
    // РЕЗУЛЬТАТ
    // ============================================

    var message =
        "Готово!\n\n" +
        "Найдено файлов: " + files.length + "\n" +
        "Успешно обработано: " + successCount + "\n" +
        "Ошибок: " + errors.length;

    if (errors.length > 0) {

        message += "\n\nПервые ошибки:\n";

        var maxErrors = Math.min(errors.length, 10);

        for (var j = 0; j < maxErrors; j++) {
            message += "\n" + errors[j] + "\n";
        }

    }

    alert(message);


    // ============================================
    // РЕКУРСИВНЫЙ ПОИСК WEBP
    // ============================================

    function collectWebPFiles(folder, result) {

        var items = folder.getFiles();

        for (var i = 0; i < items.length; i++) {

            var item = items[i];

            if (item instanceof Folder) {

                collectWebPFiles(item, result);

            } else if (
                item instanceof File &&
                /\.webp$/i.test(item.name)
            ) {

                result.push(item);

            }

        }

    }


    // ============================================
    // ОБРАБОТКА ОДНОГО ФАЙЛА
    // ============================================

    function processFile(file, index) {

        var doc = null;
        var tempFile = null;

        try {

            doc = app.open(file);

            // ------------------------------------
            // ОБРЕЗАЕМ ПРОЗРАЧНОСТЬ
            // ------------------------------------

            try {

                doc.trim(
                    TrimType.TRANSPARENT,
                    true,   // верх
                    true,   // низ
                    true,   // слева
                    true    // справа
                );

            } catch (trimError) {

                /*
                    Если прозрачных краёв нет,
                    Photoshop иногда может выдать ошибку.

                    В таком случае просто продолжаем
                    и пересохраняем картинку.
                */

            }


            // ------------------------------------
            // ВРЕМЕННЫЙ WEBP
            // ------------------------------------

            var tempName =
                "__photoshop_webp72_tmp_" +
                new Date().getTime() +
                "_" +
                index +
                ".webp";

            tempFile = new File(
                file.parent.fsName + "/" + tempName
            );


            // ------------------------------------
            // СОХРАНЯЕМ WEBP LOSSY 72
            // ------------------------------------

            saveWebP(
                tempFile,
                WEBP_QUALITY
            );


            // Закрываем оригинал, ничего в него
            // напрямую пока не записываем
            doc.close(
                SaveOptions.DONOTSAVECHANGES
            );

            doc = null;


            if (!tempFile.exists) {

                throw new Error(
                    "Photoshop не создал временный WebP."
                );

            }


            // ------------------------------------
            // ЗАМЕНЯЕМ ОРИГИНАЛ
            // ------------------------------------

            replaceOriginalSafely(
                file,
                tempFile,
                index
            );


        } catch (e) {

            if (doc !== null) {

                try {
                    doc.close(
                        SaveOptions.DONOTSAVECHANGES
                    );
                } catch (closeError) {}

            }

            if (
                tempFile !== null &&
                tempFile.exists
            ) {

                try {
                    tempFile.remove();
                } catch (removeError) {}

            }

            throw e;

        }

    }


    // ============================================
    // СОХРАНЕНИЕ WEBP
    // ============================================

    function saveWebP(saveFile, quality) {

        function s2t(string) {
            return app.stringIDToTypeID(string);
        }

        var descriptor = new ActionDescriptor();
        var webpOptions = new ActionDescriptor();


        // Lossy / С потерями
        webpOptions.putEnumerated(
            s2t("compression"),
            s2t("WebPCompression"),
            s2t("compressionLossy")
        );


        // Quality 72
        webpOptions.putInteger(
            s2t("quality"),
            quality
        );


        // Для игровых ассетов метаданные обычно не нужны
        webpOptions.putBoolean(
            s2t("includeXMPData"),
            false
        );

        webpOptions.putBoolean(
            s2t("includeEXIFData"),
            false
        );

        webpOptions.putBoolean(
            s2t("includePsExtras"),
            false
        );


        descriptor.putObject(
            s2t("as"),
            s2t("WebPFormat"),
            webpOptions
        );


        descriptor.putPath(
            s2t("in"),
            saveFile
        );


        // Save As Copy
        descriptor.putBoolean(
            s2t("copy"),
            true
        );


        descriptor.putBoolean(
            s2t("lowerCase"),
            true
        );


        executeAction(
            s2t("save"),
            descriptor,
            DialogModes.NO
        );

    }


    // ============================================
    // БЕЗОПАСНАЯ ЗАМЕНА ОРИГИНАЛА
    // ============================================

    function replaceOriginalSafely(
        original,
        temp,
        index
    ) {

        var folderPath = original.parent.fsName;
        var originalName = original.name;

        var backupName =
            originalName +
            ".__photoshop_backup_" +
            new Date().getTime() +
            "_" +
            index;

        var backupFile = new File(
            folderPath + "/" + backupName
        );


        // Сначала оригинал превращаем во временную
        // резервную копию
        if (!original.rename(backupName)) {

            throw new Error(
                "Не удалось создать временную резервную копию оригинала."
            );

        }


        backupFile = new File(
            folderPath + "/" + backupName
        );


        // Теперь ставим новый файл на место оригинала
        if (!temp.rename(originalName)) {

            // Если что-то пошло не так —
            // возвращаем оригинал назад
            try {
                backupFile.rename(originalName);
            } catch (restoreError) {}

            throw new Error(
                "Не удалось заменить оригинальный файл."
            );

        }


        // Новый файл успешно стоит на месте.
        // Удаляем временный backup.
        try {
            backupFile.remove();
        } catch (removeBackupError) {

            /*
                Даже если backup почему-то
                не удалился, новый файл уже сохранён.
            */

        }

    }

})();