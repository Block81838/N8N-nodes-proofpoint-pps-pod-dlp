import { INodeProperties } from 'n8n-workflow';

const listQuarantinedMessage: INodeProperties[] = [
	{
		displayName: 'From',
		name: 'from',
		default: undefined,
		description: 'Mail From',
		displayOptions: {
			show: {
				operation: ['list_quarantined_messages'],
			},
		},
		type: 'string',
		required: false,
	},
	{
		displayName: 'Receipt',
		name: 'rcpt',
		default: undefined,
		description: 'Mail Receipt',
		displayOptions: {
			show: {
				operation: ['list_quarantined_messages'],
			},
		},
		type: 'string',
		required: false,
	},
	{
		displayName: 'Start Date',
		name: 'startdate',
		default: undefined,
		description: 'End Date',
		displayOptions: {
			show: {
				operation: ['list_quarantined_messages'],
			},
		},
		type: 'dateTime',
		required: false,
	},
	{
		displayName: 'End Date',
		name: 'enddate',
		default: undefined,
		description: 'End Date',
		displayOptions: {
			show: {
				operation: ['list_quarantined_messages'],
			},
		},
		type: 'dateTime',
		required: false,
	},
	{
		displayName: 'Subject',
		name: 'subject',
		default: undefined,
		description: 'Subject',
		displayOptions: {
			show: {
				operation: ['list_quarantined_messages'],
			},
		},
		type: 'string',
		required: false,
	},
	{
		displayName: 'Folder',
		name: 'folder',
		default: undefined,
		description: 'Folder',
		displayOptions: {
			show: {
				operation: ['list_quarantined_messages'],
			},
		},
		type: 'string',
		required: false,
	},
];

const quarantineAction: INodeProperties[] = [
	{
		displayName: 'Action',
		name: 'action',
		default: 'release',
		description: 'Action to perform on the quarantined message',
		displayOptions: {
			show: {
				operation: ['quarantine_action'],
			},
		},
		options: [
			{ name: 'Release', value: 'release' },
			{ name: 'Delete', value: 'delete' },
			{ name: 'Resubmit', value: 'resubmit' },
			{ name: 'Forward', value: 'forward' },
			{ name: 'Move', value: 'move' },
			{ name: 'Download', value: 'download' },
		],
		required: true,
		type: 'options',
	},
	{
		displayName: 'Folder',
		name: 'folder',
		default: '',
		description: 'Folder',
		displayOptions: {
			show: {
				operation: ['quarantine_action'],
				action: ['release', 'resubmit', 'forward', 'move', 'delete'],
			},
		},
		type: 'string',
		required: false,
	},
	{
		displayName: 'Local GUID',
		name: 'localguid',
		default: '',
		description: 'Local GUID',
		displayOptions: {
			show: {
				operation: ['quarantine_action'],
				action: ['release', 'resubmit', 'forward', 'move', 'delete'],
			},
		},
		type: 'string',
		required: false,
	},
	{
		displayName: 'To',
		name: 'to',
		default: '',
		description: 'Mail To',
		displayOptions: {
			show: {
				operation: ['quarantine_action'],
				action: ['forward'],
			},
		},
		type: 'string',
		required: false,
	},
	{
		displayName: 'Deleted Folder',
		name: 'deletedfolder',
		default: '',
		description: 'Deleted Folder',
		displayOptions: {
			show: {
				operation: ['quarantine_action'],
				action: ['release', 'forward', 'delete'],
			},
		},
		type: 'string',
		required: false,
	},
	{
		displayName: 'Scan',
		name: 'scan',
		default: false,
		description: 'Scan',
		displayOptions: {
			show: {
				operation: ['quarantine_action'],
				action: ['release'],
			},
		},
		type: 'boolean',
		required: false,
	},
	{
		displayName: 'Brand Template',
		name: 'brandtemplate',
		default: '',
		description: 'Brand Template',
		displayOptions: {
			show: {
				operation: ['quarantine_action'],
				action: ['release'],
			},
		},
		type: 'string',
		required: false,
	},
	{
		displayName: 'Security Policy',
		name: 'securitypolicy',
		default: '',
		description: 'Security Policy',
		displayOptions: {
			show: {
				operation: ['quarantine_action'],
			},
		},
		type: 'string',
		required: false,
	},
	{
		displayName: 'Subject',
		name: 'subject',
		default: '',
		description: 'Subject',
		displayOptions: {
			show: {
				operation: ['quarantine_action'],
				action: ['forward'],
			},
		},
		type: 'string',
		required: false,
	},
	{
		displayName: 'Append Old Subject',
		name: 'appendoldsubject',
		default: false,
		description: 'Append Old Subject',
		displayOptions: {
			show: {
				operation: ['quarantine_action'],
				action: ['forward'],
			},
		},
		type: 'boolean',
		required: false,
	},
	{
		displayName: 'From',
		name: 'from',
		default: '',
		description: 'Mail From',
		displayOptions: {
			show: {
				operation: ['quarantine_action'],
				action: ['forward'],
			},
		},
		type: 'string',
		required: false,
	},
	{
		displayName: 'Header From',
		name: 'headerfrom',
		default: '',
		description: 'Header From',
		displayOptions: {
			show: {
				operation: ['quarantine_action'],
				action: ['forward'],
			},
		},
		type: 'string',
		required: false,
	},
	{
		displayName: 'Comment',
		name: 'comment',
		default: '',
		description: 'Comment',
		displayOptions: {
			show: {
				operation: ['quarantine_action'],
				action: ['forward'],
			},
		},
		type: 'string',
		required: false,
	},
	{
		displayName: 'Target Folder',
		name: 'targetfolder',
		default: '',
		description: 'Target Folder',
		displayOptions: {
			show: {
				operation: ['quarantine_action'],
				action: ['move'],
			},
		},
		type: 'string',
		required: false,
	},
	{
		displayName: 'GUID',
		name: 'guid',
		default: '',
		description: 'GUID',
		displayOptions: {
			show: {
				operation: ['quarantine_action'],
				action: ['download'],
			},
		},
		type: 'string',
		required: false,
	},
];

const userAction: INodeProperties[] = [
	{
		displayName: 'Action',
		name: 'action',
		default: 'get',
		description: 'Action to perform on the user',
		displayOptions: {
			show: {
				operation: ['user_action'],
			},
		},
		options: [
			{ name: 'Get', value: 'get' },
			{ name: 'Create', value: 'create' },
			{ name: 'Modify', value: 'modify' },
			{ name: 'Delete', value: 'delete' },
		],
		required: true,
		type: 'options',
	},
	{
		displayName: 'User ID',
		name: 'uid',
		default: '',
		description: 'User ID',
		displayOptions: {
			show: {
				operation: ['user_action'],
				action: ['get', 'modify', 'delete'],
			},
		},
		type: 'string',
		required: false,
	},
	{
		displayName: 'Email',
		name: 'email',
		default: '',
		description: 'Email',
		displayOptions: {
			show: {
				operation: ['user_action'],
				action: ['get', 'create', 'modify'],
			},
		},
		type: 'string',
		required: false,
	},
	{
		displayName: 'Other Fields',
		name: 'fields',
		type: 'fixedCollection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				operation: ['user_action'],
				action: ['create', 'modify'],
			},
		},
		options: [
			{
				displayName: 'Field',
				name: 'field',
				values: [
					{
						displayName: 'Key',
						name: 'key',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
					},
				],
			},
		],
		required: false,
	},
	{
		displayName: 'Attributes',
		name: 'attributes',
		type: 'fixedCollection',
		placeholder: 'Add Attribute',
		default: {},
		displayOptions: {
			show: {
				operation: ['user_action'],
				action: ['create', 'modify'],
			},
		},
		options: [
			{
				displayName: 'Attribute',
				name: 'attribute',
				values: [
					{
						displayName: 'Key',
						name: 'key',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
					},
				],
			},
		],
		required: false,
	},
];

export const proofPointApiFields: INodeProperties[] = [
	...listQuarantinedMessage,
	...quarantineAction,
	...userAction,
];
