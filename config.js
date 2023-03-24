const config = {

// General Settings

//The following can be overwritten by command line arguments

    // number of records to generate
    rowsToInsert: 100,

    // which object type to generate
    table: 'translate',

    // results file type <json or csv>
    // *** IN ORDER TO WRITE DB, OUTPUT MUST BE SPECIFIED AS 'sql' IN COMMAND LINE
    output: 'json',

// end of command line arguments

    // default patient ids to use instead of querying for pat_ids
    defaultPatIds: [255],

    // Table Data Generation Settings

    appointments: {

        intervals: {
            startTime: 8, // first appointment time
            endTime: 17, // last appointment time
            days: 7, // number of days to generate appointments
            duration: 15 // appointment duration in minutes
        },

        // chief complaint reasons
        reasons: [
            'Headache',
            'Headcold',
            'Chest pain',
            'Upset stomach in mornings',
            'Abdominal pain',
            'Right knee pain',
            'Follow up',
            'Low Back Pain',
            'Blood pressure recheck',
            'Peds visit'
        ],

        // scheduler user ids from Levi
        userIds: [20, 26, 27, 28, 44, 66, 67]

    },

    ecounters: {

        visitTypes: [
            'AUDIO',
            'BHSVISIT',
            'BILLING',
            'CMWR',
            'COMMDRIVER',
            'HISTEXAM',
            'HOSPDISC',
            'HSTESTING',
            'LIBSETUP',
            'LOVENOX',
            'NEWDOT',
            'OFFICEF',
            'PEDIATRICS',
            'PEDS2',
            'PINNACLE',
            'PROTIME',
            'QUESTIONS',
            'RESULTS',
            'TRAVEL',
            'VISION',
            'VISIT'
        ],

        // stage of the encounter
        stages: [
            'Physician',
            'Nurse',
            'Case Review - In Progress',
            'Nurse - In Progress'
        ]
    },

    // translate distinct names to be selected at random
    translate: [
        'demo_lab-Physicians', 
        'ISO-partition', 
        'nmc_hl7_cgi-doc_locations', 
        'nmc_hl7_cgi-doc_types', 
        'demo_lab2-Physicians', 
        'demo_lab3-Originator', 
        'WEBCHART-obs_codes', 
        'ARRA Chirp Interface-hl7_route', 
        'ARRA Chirp Interface-hl7_site', 
        'WEBCHART-lang-injvis', 
        'nmc_hl7_cgi-Physicians', 
        'QUESTIONNAIRE-obs_codes', 
        'Lab Sample-obs_codes', 
        'quest-obs_codes', 
        'medisys-pat_race', 
        'medisys-pat_ethnicity', 
        'medisys-apt_cancel_code', 
        'medisys-apt_locations', 
        'WEBCHART-order-status-doctype', 
        'WEBCHART-hsp-inj-order-cmp', 
        'webchart-apt_cancel_code', 
        'one_time_update-obs_codes'
    ],

    // each documents.docTypeRelationships object contains a doc_type as well as the associated storage_type and interface (I think)
    documents: {

        // locations documents can be produced (?)
        service_locations: [
            'OFFICE'
        ],

        // probably overkill
        relationships: [{
                doc_type: "2DECHO",
                storage_type: 10,
                interface: "WCDICOM"
            },
            {
                doc_type: "ADVDIRECT",
                storage_type: 7,
                interface: ""
            },
            {
                doc_type: "AUDIO",
                storage_type: 4,
                interface: ""
            },
            {
                doc_type: "CATH",
                storage_type: 6,
                interface: "WebChart Document Upload"
            },
            {
                doc_type: "COMMDRIVER",
                storage_type: 4,
                interface: ""
            },
            {
                doc_type: "CONSENT",
                storage_type: 7,
                interface: "eh_master"
            },
            {
                doc_type: "CONSENTIMM",
                storage_type: 7,
                interface: ""
            },
            {
                doc_type: "CONSNOTE",
                storage_type: 7,
                interface: ""
            },
            {
                doc_type: "CORR",
                storage_type: 7,
                interface: ""
            },
            {
                doc_type: "CR",
                storage_type: 10,
                interface: "WCDICOM"
            },
            {
                doc_type: "CT",
                storage_type: 10,
                interface: "WCDICOM"
            },
            {
                doc_type: "CXR",
                storage_type: 7,
                interface: ""
            },
            {
                doc_type: "DISCHARGE",
                storage_type: 7,
                interface: ""
            },
            {
                doc_type: "DSC",
                storage_type: 7,
                interface: "eh_master"
            },
            {
                doc_type: "EAPTC",
                storage_type: 22,
                interface: ""
            },
            {
                doc_type: "EAPTI",
                storage_type: 22,
                interface: ""
            },
            {
                doc_type: "ECHO",
                storage_type: 2,
                interface: "miEHR Document"
            },
            {
                doc_type: "ECHOWS",
                storage_type: 7,
                interface: ""
            },
            {
                doc_type: "EKG",
                storage_type: 7,
                interface: "eh_master"
            },
            {
                doc_type: "ESPVR15",
                storage_type: 22,
                interface: ""
            },
            {
                doc_type: "FLUCONSENT",
                storage_type: 3,
                interface: "WebChart Document Upload"
            },
            {
                doc_type: "FLUDECLINE",
                storage_type: 7,
                interface: ""
            },
            {
                doc_type: "FORM5020",
                storage_type: 7,
                interface: "eh_master"
            },
            {
                doc_type: "FU",
                storage_type: 7,
                interface: ""
            },
            {
                doc_type: "HIPAA",
                storage_type: 7,
                interface: ""
            },
            {
                doc_type: "HISTEXAM",
                storage_type: 4,
                interface: ""
            },
            {
                doc_type: "HOLTER",
                storage_type: 7,
                interface: "WebChart Document Upload"
            },
            {
                doc_type: "HOSPDS",
                storage_type: 14,
                interface: "miEHR Document"
            },
            {
                doc_type: "HOSPHP",
                storage_type: 14,
                interface: "miEHR Document"
            },
            {
                doc_type: "HSTEST",
                storage_type: 4,
                interface: ""
            },
            {
                doc_type: "INJECT",
                storage_type: 12,
                interface: ""
            },
            {
                doc_type: "LABFLOW",
                storage_type: 7,
                interface: ""
            },
            {
                doc_type: "LETTER",
                storage_type: 2,
                interface: "miEHR Document"
            },
            {
                doc_type: "MEMO",
                storage_type: 6,
                interface: "miEHR Document"
            },
            {
                doc_type: "MR",
                storage_type: 10,
                interface: "WCDICOM"
            },
            {
                doc_type: "MRI",
                storage_type: 6,
                interface: "WebChart Document Upload"
            },
            {
                doc_type: "NNOTE",
                storage_type: 1,
                interface: ""
            },
            {
                doc_type: "OCP_AUDIO",
                storage_type: 23,
                interface: "eh_master"
            },
            {
                doc_type: "OFFICEF",
                storage_type: 4,
                interface: ""
            },
            {
                doc_type: "OP",
                storage_type: 7,
                interface: ""
            },
            {
                doc_type: "ORDIM",
                storage_type: 15,
                interface: "Webchart Document Upload"
            },
            {
                doc_type: "ORDLAB",
                storage_type: 15,
                interface: "Webchart Document Upload"
            },
            {
                doc_type: "OUTSIDEFLU",
                storage_type: 7,
                interface: ""
            },
            {
                doc_type: "OV",
                storage_type: 6,
                interface: "WebChart Document Upload"
            },
            {
                doc_type: "OVWS",
                storage_type: 7,
                interface: ""
            },
            {
                doc_type: "PACE",
                storage_type: 7,
                interface: ""
            },
            {
                doc_type: "PACER",
                storage_type: 7,
                interface: ""
            },
            {
                doc_type: "PACETRACE",
                storage_type: 7,
                interface: ""
            },
            {
                doc_type: "PATIN",
                storage_type: 7,
                interface: ""
            },
            {
                doc_type: "PATREG",
                storage_type: 7,
                interface: ""
            },
            {
                doc_type: "PCONSENT",
                storage_type: 13,
                interface: "QUESTIONNAIRE"
            },
            {
                doc_type: "PE",
                storage_type: 7,
                interface: "eh_master"
            },
            {
                doc_type: "PEDIATRICS",
                storage_type: 4,
                interface: ""
            },
            {
                doc_type: "PFT",
                storage_type: 24,
                interface: "WebChart"
            },
            {
                doc_type: "PROB",
                storage_type: 6,
                interface: "miEHR Document"
            },
            {
                doc_type: "PROCREPORT",
                storage_type: 6,
                interface: "WebChart Document Upload"
            },
            {
                doc_type: "PSYCHI",
                storage_type: 6,
                interface: "WebChart Document Upload"
            },
            {
                doc_type: "PTHIST",
                storage_type: 7,
                interface: "eh_master"
            },
            {
                doc_type: "PWOHEAR",
                storage_type: 4,
                interface: ""
            },
            {
                doc_type: "PWORESP",
                storage_type: 4,
                interface: ""
            },
            {
                doc_type: "PWOTBSURV",
                storage_type: 4,
                interface: ""
            },
            {
                doc_type: "QUESTIONS",
                storage_type: 4,
                interface: ""
            },
            {
                doc_type: "RAD",
                storage_type: 6,
                interface: "WebChart Document Upload"
            },
            {
                doc_type: "REF",
                storage_type: 4,
                interface: ""
            },
            {
                doc_type: "REGFORM",
                storage_type: 17,
                interface: ""
            },
            {
                doc_type: "RELEASE",
                storage_type: 7,
                interface: ""
            },
            {
                doc_type: "RESULTS",
                storage_type: 4,
                interface: ""
            },
            {
                doc_type: "SURV",
                storage_type: 4,
                interface: ""
            },
            {
                doc_type: "TASKRESULT",
                storage_type: 11,
                interface: "tasklist"
            },
            {
                doc_type: "TBQ",
                storage_type: 13,
                interface: "QUESTIONNAIRE"
            },
            {
                doc_type: "ULTRAN",
                storage_type: 1,
                interface: ""
            },
            {
                doc_type: "US",
                storage_type: 6,
                interface: "WebChart Document Upload"
            },
            {
                doc_type: "USI",
                storage_type: 10,
                interface: "WCDICOM"
            },
            {
                doc_type: "VASCUS",
                storage_type: 7,
                interface: "WebChart Document Upload"
            },
            {
                doc_type: "VISION",
                storage_type: 13,
                interface: "TITMUS"
            },
            {
                doc_type: "VISIT",
                storage_type: 4,
                interface: ""
            },
            {
                doc_type: "WC_EXAM",
                storage_type: 4,
                interface: ""
            },
            {
                doc_type: "WCALERT",
                storage_type: 1,
                interface: ""
            },
            {
                doc_type: "WCCCR",
                storage_type: 21,
                interface: ""
            },
            {
                doc_type: "WCCDA",
                storage_type: 19,
                interface: ""
            },
            {
                doc_type: "WCDOCNOT",
                storage_type: 1,
                interface: "miEHR Document"
            },
            {
                doc_type: "WCINS",
                storage_type: 7,
                interface: ""
            },
            {
                doc_type: "WCLAB",
                storage_type: 7,
                interface: "pview-lab"
            },
            {
                doc_type: "WCMAR",
                storage_type: 12,
                interface: ""
            },
            {
                doc_type: "WCORDER",
                storage_type: 7,
                interface: "FWCOrderDJC"
            },
            {
                doc_type: "WCPATED",
                storage_type: 4,
                interface: ""
            },
            {
                doc_type: "WCPHOTO",
                storage_type: 0,
                interface: "WebChart Document Upload"
            },
            {
                doc_type: "WCREMINDER",
                storage_type: 4,
                interface: ""
            },
            {
                doc_type: "WCTASK",
                storage_type: 11,
                interface: "tasklist"
            },
            {
                doc_type: "WKSTATUS",
                storage_type: 4,
                interface: ""
            }
        ]

    }

};


export default config;
