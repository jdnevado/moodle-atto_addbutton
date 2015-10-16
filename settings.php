<?php
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

/**
 * Settings that allow to fix a javacript style to apply with addbutton atto pluigin.
 *
 * @package    atto_addbutton
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

$ADMIN->add('editoratto', new admin_category('atto_addbutton', new lang_string('pluginname', 'atto_addbutton')));

$settings = new admin_settingpage('atto_addbutton_settings', new lang_string('settings', 'atto_addbutton'));
if ($ADMIN->fulltree) {
    $setting = new admin_setting_configtext('atto_addbutton/style',
                                                get_string('style', 'atto_addbutton'),
                                                get_string('style_description', 'atto_addbutton'),
                                                'bold');
    $settings->add($setting);
}
