const fs = require('fs');
const notes = require('./notes.js');
const _ = require('lodash');
const yargs = require('yargs');

const titleOptions =  {
	describe: 'Title of note',
	demand: true,
	alias: 't'
};

const bodyOptions = {
	describe: 'Body of note',
	demand: true,
	alias: 'b'
};

const argv = yargs
	.command('add', 'Add a new note', {
		title : titleOptions,
		body : bodyOptions
	})
	.command('list', 'List all notes')
	.command('read', 'Read a note', {
		title: titleOptions
	})
	.command('remove', 'Remove a note', {
		title: titleOptions
	})
	.help()
	.argv;

var command = argv._[0];

if (command === 'add') {
	var note = notes.addNote(argv.title, argv.body);

	if (note) {
		console.log("adding note")
		notes.logNote(note);
	} else {
		console.log('Title already taken');
	}

} else if (command === 'list') {
	var allNotes = notes.getAll();
	console.log(`printing ${allNotes.length} note(s)`);
	// iterates through each of the note objects
	allNotes.forEach((note) => notes.logNote(note));

} else if (command === 'read') {
	var note = notes.readNote(argv.title);
	if (note) {
		console.log('Note found');
		notes.logNote(note);

	} else {
		console.log('Note not found');
	}

} else if (command === 'remove') {
	var noteRemoved = notes.removeNote(argv.title);
	// ternary operators -> left hand side is 'truthy' return statement, right is 'falsy'
	var message = noteRemoved ? 'Note was removed' : 'Title was not found';
	console.log(message);

} else {
	console.log('Command not recognized');
}
