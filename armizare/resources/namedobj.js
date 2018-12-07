/*
 * namedobj.js
 *
 * This script is normally called from the main plug-in script.
 * It defines an object to contain fonts and other shared resources,
 * and then registers it as a named object. A named object is an
 * object that can be created in one script, and used from another
 * script that is run at a later time.
 */

useLibrary('fontutils');
useLibrary('imageutils');
useLibrary('markup');

importClass(resources.ResourceKit);

// Note that anything that we put in 'this' while inside this function will
// be available from our named object later.
function armizareObject() {
	this.GAME_CODE = 'armizare';
	
	const base = '/';
	this.base = base;

	// Register the fonts needed for our cards, and store the family names
    var vinque = new Array('fonts/vinque.ttf');
    		
	this.headingFamily = FontUtils.registerFontFamilyFromResources.apply(this, vinque);

	// The font we use for stats like initiative and Upgrade bar; when you draw text
	// using one of the sheet's text drawing methods, you need to create
	// a Font object for it; when you draw text in a markup box, you
	// set the font's family name (e.g., 'Arial'), style, and size using
	// TextStyles (see the definition of titleBox, for example).
	//this.iconFont = new Font(this.iconFamily, Font.PLAIN, 7);
	
	
	//
	// Define some helper functions for creating markup boxes
	//
		
	/**
	 * headingBox(sheet, size)
	 * Creates a new markup box for title areas.
	 *
	 * sheet : the sheet to create the box for
	 * size : font size
	 */
	this.headingBox = function titleBox(sheet, size) {
		var box = markupBox(sheet);
		
		box.defaultStyle = new TextStyle(
			FAMILY,		this.headingFamily,
			COLOR,		Color.WHITE,
			SIZE,		size,
			WIDTH,		WIDTH_SEMICONDENSED,
			TRACKING,	-0.1
		);
		
		box.alignment = box.LAYOUT_CENTER | box.LAYOUT_MIDDLE;
		box.headlineAlignment = box.LAYOUT_CENTER | box.LAYOUT_MIDDLE;
		
		//box.lineTightness = -0.5;
		//box.tightnessLimit = -0.5;
		//box.lineTightness = 1.5;
		//box.tightnessLimit = 1.5;
		
		box.textFitting = box.FIT_SCALE_TEXT;
		
		return box;
	};
	
	this.smallCaps = function smallCaps(text) {
		smallCapsedText = '';
		for(let i = 0; i < text.length; ++i) {
			if(text[i] == text[i].toUpperCase()) {
				smallCapsedText = smallCapsedText + text[i];
			} else {
				smallCapsedText = smallCapsedText + '<size 70%>' + text[i].toUpperCase() + '</size>';
			}
		}		
		return smallCapsedText;
	};
	}

//
// Create the object and place it in the named object database;
// then we can look it up from other scripts in the same way, e.g.:
//
// const Xwing = Eons.namedObjects.Xwing;
// println(Xwing.titleFamily);
//

Eons.namedObjects.armizare = new armizareObject();