const fs = require('fs')

var fetchNotes = () => {
	try {
		var notesString = fs.readFileSync('notes-data.json');
		return JSON.parse(notesString);
	} catch (e) {
		return [];
	}
};

var saveNotes = (notes) => {
	fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
	var notes = fetchNotes();
	var note = {
		title,
		body
	};

	var duplicateNotes = notes.filter((note) => note.title === title);

	if (duplicateNotes.length === 0) {
		notes.push(note);
		saveNotes(notes);
		return note;
	} 
};

var getAll = () => {
	return fetchNotes();
}

var readNote = (title) => {
	var note = fetchNotes();
	var targetNote = note.filter((note) => note.title === title);
	return targetNote[0];
};

var removeNote = (title) => {
	var notes = fetchNotes();
	var targetNotes = notes.filter((note) => note.title !== title);
	saveNotes(targetNotes);
	return notes.length !== targetNotes.length;
};

var logNote = (note) => {
	// run node inspect app.js read --title <note title>
	// can also use nodemon for constant updates and such
	// n will skip to execute next line
	// c will execute to end of program or until the debugger break
	// you can use repl to inspect different elements (eg repl -> note to inspect the note object)
	debugger;
	console.log('---');
	console.log(`Title: ${note.title}`);
	console.log(`Body: ${note.body}`);
};

module.exports = {
	addNote,
	getAll,
	readNote,
	removeNote,
	logNote
};