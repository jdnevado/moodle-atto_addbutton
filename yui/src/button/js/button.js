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

var COMPONENTNAME = 'atto_addbutton',
    TEMPLATE = '' +
            '<form class="atto_form">' +
                '<label>{{get_string "enterstyle" component}}</label>' +
                '<input class="atto_addbutton_stylentry" type="text" id="{{elementid}}_atto_link_stylentry" size="32"/><br/>' +
                '<div class="mdl-align">' +
                    '<br/>' +
                    '<button type="submit" class="submit">{{get_string "setstyle" component}}</button>' +
                '</div>' +
            '</form>';

Y.namespace('M.atto_addbutton').Button = Y.Base.create('button', Y.M.editor_atto.EditorPlugin, [], {

    /**
     * A reference to the current selection at the time that the dialogue
     * was opened.
     *
     * @property _currentSelection
     * @type Range
     * @private
     */
    _currentSelection: null,

    /**
     * A reference to the dialogue content.
     *
     * @property _content
     * @type Node
     * @private
     */
    _content: null,


     initializer: function() {
            this.addButton({
                callback: this._displayDialogue
            });
    },

    _execCommand: function(e) {
        // The editor instance that this plugin was instantiated by.
        var host = this.get('host');
        // Prevent default event (confir submit).
        e.preventDefault();

        // Hides the dialogue by setting the "visible" attribute to "false".
        this.getDialogue({
            focusAfterHide: null
        }).hide();

        this.editor.focus();
        host.setSelection(this._currentSelection);

        var style = this._content.one('.atto_addbutton_stylentry').get('value');
        document.execCommand(style, false, null);

        //document.execCommand(style, false, null);
        this.markUpdated();
    },

    _displayDialogue: function() {
        // Store the current selection.
        this._currentSelection = this.get('host').getSelection();
        if (this._currentSelection === false) {
            return;
        }

        // Fetch the instantiated dialogue. If a dialogue has not yet been created, instantiate one.
        // this.getDialogue returns M.core.dialogue.
        var dialogue = this.getDialogue({
            // The content to be added to the header section.
            headerContent: M.util.get_string('setstyle', COMPONENTNAME),
            // Set the focusAfterHide setting to the specified Node according to the following values:
            // If true was passed, the first button for this plugin will be used instead; or
            // If a String was passed, the named button for this plugin will be used instead; or
            // If a Node was passed, that Node will be used instead.
            // This setting is checked each time that getDialogue is called
            focusAfterHide: true,
            // Selector to a node that should recieve focus when this dialogue is shown.
            focusOnShowSelector: ".atto_addbutton_stylentry"
        });


        // Set the dialogue content, and then show the dialogue.
        dialogue.set('bodyContent', this._getDialogueContent());
        // Shows the dialogue by setting the "visible" attribute to "true".
        dialogue.show();
    },

    /**
     * Generates the content of the dialogue. Create a node with TEMPLATE variable and
     * add a allback function (this._execCommand) to submit event.
     *
     * @method _getDialogueContent
     * @return {Node} Node containing the dialogue content
     * @private
     */
    _getDialogueContent: function() {
        // Compile that string into a Handlebars template function to resolve {{}} expressions.
        var template = Y.Handlebars.compile(TEMPLATE);
        // Create html Node.
        this._content = Y.Node.create(template({
            component: COMPONENTNAME
        }));
        // Adding submit event.
        this._content.one('.submit').on('click', this._execCommand, this);


        return this._content;
    }
});
