if (typeof cave === "undefined") {
    window.cave = {
        /**
         * Returns B64 encoded user Mii image with requested expression
         * @param expression {number} 0-5
         * @returns {string}
         */
        mii_getIconBase64: function (expression) {
            console.log('cave.mii_getIconBase64 expression = ' + expression);
            // 本来表情毎に出し分けるべきだが、とりあえず固定のものを出す
            // Originally, it should be displayed separately for each expression, but for the time being, a fixed one should be displayed
            return 'data:image/png;base64,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';
        },
        /**
         * Returns name of user Mii
         * @returns {string}
         */
        mii_getName: function () {
            console.log('cave.mii_getName');
            return 'chris4403';
        },
        /**
         * Exits the app
         */
        exitApp: function () {
            console.log('cave.exitApp()');
        },
        /**
         * Returns a JSON string, containing app IDs
         * @param minutes
         * @returns {string}
         */
        plog_getPlayTitlesFilteredByPlayTime: function (minutes) {
            console.log('cave.plog_getPlayTitlesFilteredByPlayTime(' + minutes + ')');
            return '{"IDs":["0004001000020700"]}'; // Miiスタジオ (Mii studio)
        },
        /**
         * Jumps to user account settings
         */
        jump_toAccount: function () {
            console.log('cave.jump_toAccount()');
        },
        /**
         * play (predefined) sound effect
         * @param label
         */
        /* Values:
        SE_OLV_CANCEL
        SE_OLV_OK
        SE_OLV_OK_SUB
        SE_OLV_CHECKBOX_CHECK
        SE_OLV_CHECKBOX_UNCHECK
        SE_OLV_MII_ADD
        SE_OLV_RELOAD
        SE_OLV_BALLOON_OPEN
        SE_OLV_BALLOON_CLOSE
        SE_WAVE_SCROLL_PAGE
        SE_WAVE_SCROLL_PAGE_LR
        SE_WAVE_SCROLL_LIMIT_LR
        SE_CTR_COMMON_TOUCH
        SE_CTR_COMMON_TOUCHOUT
        SE_CTR_COMMON_TOUCHOUT_S
        SE_CTR_COMMON_TOUCHIN
        SE_CTR_COMMON_TOGGLE
        SE_CTR_COMMON_SILENT
        SE_CTR_COMMON_BUTTON
        SE_CTR_COMMON_OK
        SE_CTR_COMMON_RETURN
        SE_CTR_COMMON_CANCEL
        SE_CTR_COMMON_WAIT
        SE_CTR_COMMON_WAIT_END
        SE_CTR_COMMON_CONNECT
        SE_CTR_COMMON_ERROR
        SE_CTR_COMMON_NOTICE
        SE_CTR_COMMON_NOMOVE
        SE_CTR_COMMON_SCROLL
        SE_CTR_COMMON_SCROLL_LIST
        SE_CTR_COMMON_SCROLL_TEXT
        SE_CTR_COMMON_SCROLL_END
        SE_CTR_COMMON_DIALOG
        SE_CTR_COMMON_SYSAPPLET_END
        SE_CTR_SPIDER_HG_Prev
        SE_CTR_SPIDER_HG_Next
        SE_CTR_SPIDER_MV_START
        SE_CTR_SPIDER_LINK
        SE_CTR_SPIDER_YOMIKOMI
        SE_CTR_SPIDER_YOMIEND
        SE_CTR_SPIDER_YomiCancel
        SE_CTR_SPIDER_MV_KAKTEI
        SE_CTR_SPIDER_MV_LINE
        SE_CTR_SPIDER_MV_CURSOR
        SE_CTR_SPIDER_FavCursor
        SE_CTR_SPIDER_Navi
        SE_CTR_SPIDER_Navi_On
        SE_CTR_SPIDER_Navi_Off
        SE_CTR_SPIDER_ZOOM2BIG
        SE_CTR_SPIDER_ZOOM2SMALL
        SE_CTR_SPIDER_LINK_CLICK
        SE_CTR_SPIDER_BTN_CLICK
        SE_CTR_SPIDER_Ticker
        SE_CTR_SPIDER_SEL_START
        SE_CTR_SPIDER_SEL_CURSOR
        SE_CTR_SPIDER_InfoOn
        SE_CTR_SPIDER_SEL_END
         */
        snd_playSe: function (label) {
            console.log('cave.snd_playSe(' + label + ')');
        },
        /**
         * Play (predefined) background music
         * @param label
         */
        /* Values:
        BGM_ACCOUNT_OP
        BGM_CAVE_MAIN
        BGM_CAVE_MAIN_LOOP
        BGM_CAVE_MAIN_LOOP_NOWAIT
        BGM_CAVE_WORLD_MAP_MINT
        BGM_CAVE_WORLD_MAP
        BGM_CAVE_MAIN_OFFLINE
        BGM_CAVE_SETTING
        BGM_CAVE_SYOKAI
        BGM_CAVE_SYOKAI2
         */
        snd_playBgm: function (label) {
            console.log('cave.snd_playBgm(' + label + ')');
        },
    };
} //namespace