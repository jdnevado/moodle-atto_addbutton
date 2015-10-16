YUI.add('moodle-atto_addbutton-button', function (Y, NAME) {

// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/*
 * Atto basicButton example.
 *
 * @package    atto_addbutton
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * @module moodle-atto_addbutton-button
 */

/**
 * Atto
 *
 * @namespace M.atto_addbutton
 * @class button
 * @extends M.editor_atto.EditorPlugin
 */

Y.namespace('M.atto_addbutton').Button = Y.Base.create('button', Y.M.editor_atto.EditorPlugin, [], {
     initializer: function() {
            this.addButton({
                callback: this._execCommand,
                callbackArgs: 'bold',
                icon: 'e/emoticon'
            });
    },

    _execCommand: function(e, style) {
        document.execCommand(style, false, null);
        this.markUpdated();
    }
});


}, '@VERSION@', {"requires": ["moodle-editor_atto-plugin"]});
