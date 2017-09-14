/*
 * Copyright (c) 2013-2014 Minkyu Lee. All rights reserved.
 *
 * NOTICE:  All information contained herein is, and remains the
 * property of Minkyu Lee. The intellectual and technical concepts
 * contained herein are proprietary to Minkyu Lee and may be covered
 * by Republic of Korea and Foreign Patents, patents in process,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Minkyu Lee (niklaus.lee@gmail.com).
 *
 */

/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50, regexp: true */
/*global define, $, _, window, appshell, staruml, app */

define(function (require, exports, module) {
    "use strict";

    var AppInit           = app.getModule("utils/AppInit"),
        Core              = app.getModule("core/Core"),
        PreferenceManager = app.getModule("core/PreferenceManager");

    var preferenceId = "irgma.php.laravel";

    var laravelPreferences = {
        "irgma.php.laravel.hlp": {
            text: "Laravel Output Packages",
            type: "Section"
        },
        "irgma.php.laravel.hlp.controllerPkg": {
            text: "Append to interface filename",
            description: "Insert value into interface filename extensions (e.g. MyInterface.interface.php)",
            type: "String",
            default: "App::Http::Controllers"
        },
        "irgma.php.laravel.hlp.repositoryPkg": {
            text: "Append to interface filename",
            description: "Insert value into interface filename extensions (e.g. MyInterface.interface.php)",
            type: "String",
            default: "App::Domain::Allwissend::Repositories"
        },
        "irgma.php.laravel.hlp.servicePkg": {
            text: "Append to interface filename",
            description: "Insert value into interface filename extensions (e.g. MyInterface.interface.php)",
            type: "String",
            default: "App::Domain::Allwissend::Services"
        },
        "irgma.php.laravel.hlp.angularServicePkg": {
            text: "Append to interface filename",
            description: "Insert value into interface filename extensions (e.g. MyInterface.interface.php)",
            type: "String",
            default: "Angular::services"
        },
        "irgma.php.laravel.hlp.angularInterfacePkg": {
            text: "Append to interface filename",
            description: "Insert value into interface filename extensions (e.g. MyInterface.interface.php)",
            type: "String",
            default: "Angular::interfaces"
        },
        "irgma.php.laravel.hlp.defaulErd": {
            text: "Append to interface filename",
            description: "Insert value into interface filename extensions (e.g. MyInterface.interface.php)",
            type: "String",
            default: "Data Model"
        },

        "irgma.php.laravel.hlp.testsSec": {
            text: "Tests Output Packages",
            type: "Section"
        },
        "irgma.php.laravel.hlp.tests": {
            text: "PHPDoc",
            description: "Generate Dusk and PHPUnit tests.",
            type: "Check",
            default: true
        },
        "irgma.php.laravel.hlp.unitTestPkg": {
            text: "Create Respositories tests",
            description: "...",
            type: "String",
            default: "Tests::Unit"
        },
        "irgma.php.laravel.hlp.featureTestPkg": {
            text: "Create Features/Controllers tests",
            description: "...",
            type: "String",
            default: "'Tests::Feature'"
        },
        "irgma.php.laravel.hlp.serviceTestPkg": {
            text: "Generate Services tests",
            description: "...",
            type: "String",
            default: "Tests::Unit"
        },
        "irgma.php.laravel.hlp.duskTestPkg": {
            text: "Generate Dusk tests",
            description: "...",
            type: "String",
            default: "Tests::Browser"
        },




        "irgma.php.laravel.hlp.docsSec": {
            text: "Documentations (PHPDoc/Swagger/Markdown comments.)",
            type: "Section"
        },
        "irgma.php.laravel.hlp.phpDoc": {
            text: "PHPDoc",
            description: "Generate PHPDoc comments using plain text",
            type: "Check",
            default: true
        },
        "irgma.php.laravel.hlp.phpDocMakrdown": {
            text: "Markdown PHPDoc",
            description: "Generate PHPDoc comments using Makrdown. Useful for export HTML documentations direcly from StarUML",
            type: "Check",
            default: true
        },
        "irgma.php.laravel.hlp.phpDocSwagger": {
            text: "PHPSwagger in PHPDoc",
            description: "Generate PHP Swagger anotations comments for default generated methods (save, update, delete...) in Controllers.",
            type: "Check",
            default: true
        },



        "irgma.php.laravel.hlp.phpStrictMode": {
            text: "Strict Mode",
            description: "Generate PHP Strict Mode.",
            type: "Check",
            default: true
        },
        "irgma.php.laravel.hlp.phpReturnType": {
            text: "Return Type",
            description: "Generate PHP Return Type (e.q. PHP7).",
            type: "Check",
            default: false
        },
        "irgma.php.laravel.hlp.useTab": {
            text: "Use Tab",
            description: "Use Tab for indentation instead of spaces.",
            type: "Check",
            default: true
        },
        "irgma.php.laravel.hlp.indentSpaces": {
            text: "Indent Spaces",
            description: "Number of spaces for indentation.",
            type: "Number",
            default: 4
        },
        "irgma.php.laravel.hlp.classExtension": {
            text: "Append to class filename",
            description: "Insert value into class filename extensions (e.g. MyClass.class.php)",
            type: "String",
            default: ""
        },
        "irgma.php.laravel.hlp.interfaceExtension": {
            text: "Append to interface filename",
            description: "Insert value into interface filename extensions (e.g. MyInterface.interface.php)",
            type: "String",
            default: ""
        },
    };

    function getId() {
        return preferenceId;
    }

    function getGenOptions() {
        return {
            controllerPkg : PreferenceManager.get("irgma.php.laravel.hlp.controllerPkg"),
            repositoryPkg : PreferenceManager.get("irgma.php.laravel.hlp.repositoryPkg"),
            servicePkg    : PreferenceManager.get("irgma.php.laravel.hlp.servicePkg"),
            angularServicePkg  : PreferenceManager.get("irgma.php.laravel.hlp.angularServicePkg"),
            angularInterfacePkg: PreferenceManager.get("irgma.php.laravel.hlp.angularInterfacePkg"),
            defaulErd     : PreferenceManager.get("irgma.php.laravel.hlp.defaulErd"),

            createTests   : PreferenceManager.get("irgma.php.laravel.hlp.tests"),
            unitTestPkg   : PreferenceManager.get("irgma.php.laravel.hlp.unitTestPkg"),
            featureTestPkg: PreferenceManager.get("irgma.php.laravel.hlp.featureTestPkg"),
            serviceTestPkg: PreferenceManager.get("irgma.php.laravel.hlp.serviceTestPkg"),
            duskTestPkg   : PreferenceManager.get("irgma.php.laravel.hlp.duskTestPkg"),

            phpDoc        : PreferenceManager.get("irgma.php.laravel.hlp.phpDoc"),
            phpDocMakrdown: PreferenceManager.get("irgma.php.laravel.hlp.phpDocMakrdown"),
            phpDocSwagger : PreferenceManager.get("irgma.php.laravel.hlp.phpDocSwagger"),

            useTab        : PreferenceManager.get("irgma.php.laravel.hlp.useTab"),
            indentSpaces  : PreferenceManager.get("irgma.php.laravel.hlp.indentSpaces"),
            classExtension: PreferenceManager.get("irgma.php.laravel.hlp.classExtension"),
            interfaceExtension : PreferenceManager.get("irgma.php.laravel.hlp.interfaceExtension"),
            phpStrictMode : PreferenceManager.get("irgma.php.laravel.hlp.phpStrictMode"),
            phpReturnType : PreferenceManager.get("irgma.php.laravel.hlp.phpReturnType")
        };
    }

    AppInit.htmlReady(function () {
        PreferenceManager.register(preferenceId, "Laravel Helper", laravelPreferences);
    });

    exports.getId         = getId;
    exports.getGenOptions = getGenOptions;

});
