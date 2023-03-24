import { 
    appointmentIntervals, 
    createAppointments, 
    createPatients, 
    createDocuments, 
    createEncounters,
    createTranslate,
    createObservations,
    getPatIds, 
    getAppointmnets, 
    dataInsert 
} from 'mie-data-faker';
import { program } from 'commander';
import ObjectsToCsv from 'objects-to-csv';
import moment from 'moment';
import fs from 'fs';
import config from './config.js';
// import * as dotenv from 'dotenv';
// dotenv.config();


program
    .option('-t, --table <table>', 'table data to generate (patients, appointments, documents, encounters, translate)')
    .option('-o, --output <output>', 'output extension (json, csv or directly to sql db)')
    .option('-n, --number <number>', 'number of records to generate')

program.parse(process.argv);

const options = program.opts();
const table = options.table ? options.table : config.table;
const output = options.output ? options.output : config.output;
const rowsToInsert = options.number ? options.number : config.rowsToInsert;
const writeToDb = output === 'sql' ? true : false;

const resultsObject = {};

async function generateData() {

    switch (table) {
        
        case 'appointments':

            const multiResourceAppointmentsTable = 'multi_resource_apt';

            resultsObject.appointments = [];

            if (writeToDb) {
                    
                patIds = await getPatIds(writeToDb);

            }            

            for (let i = 0; i < config.appointments.intervals.days; i++) {

                const start = moment(new Date())
                    .add(i, 'days')
                    .set({
                        hour: config.appointments.intervals.startTime,
                        minute: 0
                    })
                    .format('YYYY-MM-DD hh:mm a');

                const end = moment(new Date())
                    .add(i, 'days')
                    .set({
                        hour: config.appointments.intervals.endTime,
                        minute: 0
                    })
                    .format('YYYY-MM-DD hh:mm a');

                const intervals = appointmentIntervals(start, end);

                intervals.forEach(async function (interval) {

                    const appointment = createAppointments(
                        interval[0], 
                        interval[1], 
                        patIds, 
                        config.appointments.reasons, 
                        config.appointments.userIds
                    );

                    try {

                        if (writeToDb) {

                            const appointmentResult = await dataInsert(appointment, table);

                            await dataInsert({
                                apt_id: appointmentResult.insertId,
                                res_id: appointment.user_id
                            }, multiResourceAppointmentsTable, i);

                        } else {

                            resultsObject.appointments.push(appointment);

                        }

                    } catch (err) {

                        console.error(err);

                    };
                });
            };

            break;

        case 'patients': {

            resultsObject.patients = [];

            for (let i = 0; i < rowsToInsert; i++) {

                const patient = JSON.stringify(createPatients());

                    if (writeToDb) {

                        await dataInsert(JSON.parse(patient), table , i);

                    } else {

                        resultsObject.patients.push(JSON.parse(patient));

                    }
                };

            break;
        };

        case 'documents': {
            
            resultsObject.documents = [];

            if (writeToDb) {

                patIds = await getPatIds(writeToDb);

            }
                        
            for (let i = 0; i < rowsToInsert; i++) {

                const document = JSON.stringify(createDocuments(
                    patIds, 
                    config.documents.relationships, 
                    config.documents.service_locations
                ));

                if (writeToDb) {

                    dataInsert(JSON.parse(document), table, i);

                } else {

                    resultsObject.documents.push(JSON.parse(document));

                }
            };
                
            break;

        };

        case 'encounters' : {

            getAppointmnets(writeToDb)
            .then(function(appointments) {

                for (let i = 0; i < rowsToInsert; i++) {

                    const encounter = JSON.stringify(createEncounters(appointments));

                    if (writeToDb) {

                        dataInsert(JSON.parse(encounter), table, i);

                    } else {

                        console.error('Encounter generation requires database connection. Please define db connection params in .env file and set writeToDb to true in config.js');

                    }
                };      
            })

            .catch(function(err) {
                    
                console.error(err);
    
            });

            break;

        };

        case 'translate': {

            resultsObject.translate = [];

            for (let i = 0; i < rowsToInsert; i++) {
                
                const translations = createTranslate(config.translate);

                if (writeToDb) {

                    await dataInsert(translations, table, i);
                
                } else {

                    resultsObject.translate.push(JSON.parse(translations));

                };

            };

        };

        case 'observations': {

            resultsObject.observations = [];

            const patIds = config.defaultPatIds;
            let k = 1;

            for (let i = 0; i < rowsToInsert; i++) {

                if (i > 0 && i % 150 === 0) {
                        
                        k += 1;

                };

                const observation = JSON.stringify(createObservations(k, patIds));

                if (writeToDb) {

                    await dataInsert(JSON.parse(observation), table, i);

                } else {

                    resultsObject.observations.push(JSON.parse(observation));

                }

            }

        }

    };
};

function writeToJSON(table, obj) {

    const filePath = `./results/${table}-results_${new Date().toISOString()}.json`;

    fs.writeFile(filePath, obj, function (err) {

        if (err) throw err;

        console.log('Saved!');

    });
};

function writeToCsv(table, obj) {

    const csv = new ObjectsToCsv(obj);

    csv.toDisk(`./results/${table}-results_${new Date().toISOString()}.csv`);

}

function displayProgress(i, table) {

    return `Inserting ${i + 1} of ${rowsToInsert} records into ${table} table`;

};

generateData()
    .then(function() {
        
        if (writeToDb) {

            console.log('Done! Process will exit in 10 seconds.');
            setTimeout(() => {
                process.exit();
            }, 10000)

        } else if (output === 'json') {

            writeToJSON(table, JSON.stringify(resultsObject, null, 4));
            
        } else if (output === 'csv') {

            writeToCsv(table, resultsObject[table]);

        } else {

            console.error('Please specify output type (json or csv)');

        }
    })
    .catch(function(err) {

        console.error(err);
        
    });
