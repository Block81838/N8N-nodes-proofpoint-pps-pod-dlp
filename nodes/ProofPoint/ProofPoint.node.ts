import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IRequestOptions,
	NodeOperationError,
	NodeConnectionType,
} from 'n8n-workflow';
import { proofPointApiFields } from './ProofPointApi';

export class ProofPoint implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'ProofPoint',
		name: 'proofpoint',
		icon: 'file:proofpoint.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact With Proofpoint',
		defaults: {
			name: 'ProofPoint',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'proofpoint',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://127.0.0.1',
			url: '',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},

		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,

				options: [
					{
						name: 'List Quarantined Messages',
						value: 'list_quarantined_messages',
						description: 'List Quarantined Messages',
					},
					{
						name: 'Quarantine Action',
						value: 'quarantine_action',
						description: 'Quarantine Action',
					},
					{
						name: 'User Action',
						value: 'user_action',
						description: 'User Action',
					},
				],
				default: 'list_quarantined_messages',
			},

			...proofPointApiFields,
		],
	};
	async execute(this: IExecuteFunctions) {
		let items: INodeExecutionData[] = this.getInputData();
		let operation = this.getNodeParameter('operation', 0) as string;
		let baseURL = (await this.getCredentials('proofpoint')).domain.toString().replace(/\/$/, '');
		let returnData: Array<Record<string, any>> = [];
		for (let i = 0; i < items.length; i++) {
			try {
				if (operation === 'list_quarantined_messages') {
					let listQuarantinedMessagesURL = `${baseURL}/quarantine`;

					let from = this.getNodeParameter('from', i, '');
					let rcpt = this.getNodeParameter('rcpt', i, '');
					let subject = this.getNodeParameter('subject', i, '');
					let folder = this.getNodeParameter('folder', i, '');
					let startdate = this.getNodeParameter('startdate', i, '');
					let enddate = this.getNodeParameter('enddate', i, '');

					let listQuarantinedMessagesQuery: { [key: string]: any } = {};

					if (from) listQuarantinedMessagesQuery.from = from;
					if (rcpt) listQuarantinedMessagesQuery.rcpt = rcpt;
					if (subject) listQuarantinedMessagesQuery.subject = subject;
					if (folder) listQuarantinedMessagesQuery.folder = folder;
					if (startdate) listQuarantinedMessagesQuery.startdate = startdate;
					if (enddate) listQuarantinedMessagesQuery.enddate = enddate;

					let queryConfig: IRequestOptions = {
						method: 'GET',
						qs: listQuarantinedMessagesQuery,
						url: listQuarantinedMessagesURL,
						headers: {
							'Content-Type': 'application/json',
							Accept: 'application/json',
						},
					};
					let res = await this.helpers.requestWithAuthentication.call(
						this,
						'proofpoint',
						queryConfig,
					);
					returnData.push(res);
				} else if (operation === 'quarantine_action') {
					let quarantineURL = `${baseURL}/quarantine`;
					let action = this.getNodeParameter('action', i, '');
					let folder = this.getNodeParameter('folder', i, '');
					let localguid = this.getNodeParameter('localguid', i, '');
					let to = this.getNodeParameter('to', i, '');
					let deletedfolder = this.getNodeParameter('deletedfolder', i, '');
					let scan = this.getNodeParameter('scan', i) as boolean;
					let brandtemplate = this.getNodeParameter('brandtemplate', i, '');
					let securitypolicy = this.getNodeParameter('securitypolicy', i, '');
					let subject = this.getNodeParameter('subject', i, '');
					let appendoldsubject = this.getNodeParameter('appendoldsubject', i, '');
					let from = this.getNodeParameter('from', i, '');
					let headerfrom = this.getNodeParameter('headerfrom', i, '');
					let comment = this.getNodeParameter('comment', i, '');
					let targetfolder = this.getNodeParameter('targetfolder', i, '');
					let guid = this.getNodeParameter('guid', i, '');

					let quarantineQuery: { [key: string]: any } = { action };

					if (folder) quarantineQuery.folder = folder;
					if (localguid) quarantineQuery.localguid = localguid;
					if (to) quarantineQuery.to = to;
					if (deletedfolder) quarantineQuery.deletedfolder = deletedfolder;
					quarantineQuery.scan = scan;
					if (brandtemplate) quarantineQuery.brandtemplate = brandtemplate;
					if (securitypolicy) quarantineQuery.securitypolicy = securitypolicy;
					if (subject) quarantineQuery.subject = subject;
					if (appendoldsubject) quarantineQuery.appendoldsubject = appendoldsubject;
					if (from) quarantineQuery.from = from;
					if (headerfrom) quarantineQuery.headerfrom = headerfrom;
					if (comment) quarantineQuery.comment = comment;
					if (targetfolder) quarantineQuery.targetfolder = targetfolder;
					if (guid) quarantineQuery.guid = guid;

					let queryConfig: IRequestOptions = {
						method: action === 'download' ? 'GET' : 'POST',
						body: quarantineQuery,
						url: quarantineURL,
						headers: {
							'Content-Type': 'application/json',
							Accept: 'application/json',
						},
					};
					let res = await this.helpers.requestWithAuthentication.call(
						this,
						'proofpoint',
						queryConfig,
					);

					returnData.push(res);
				} else if (operation === 'user_action') {
					let action = this.getNodeParameter('action', i, '');
					let uid = this.getNodeParameter('uid', i, '');
					let email = this.getNodeParameter('email', i, '');
					let uid_or_email = uid || email;
					let userActionURL = `${baseURL}/enduser/${uid_or_email}`;
					let fields = this.getNodeParameter('fields', i, '') as object;
					let attributes = this.getNodeParameter('attributes', i, '');

					let userActionQuery: { [key: string]: any } = { action, ...fields, attributes };

					let queryConfig: IRequestOptions = {
						method:
							action === 'get'
								? 'GET'
								: action === 'create'
									? 'POST'
									: action === 'modify'
										? 'PUT'
										: 'DELETE',
						body: userActionQuery,
						url: userActionURL,
						headers: {
							'Content-Type': 'application/json',
							Accept: 'application/json',
						},
					};
					let res = await this.helpers.requestWithAuthentication.call(
						this,
						'proofpoint',
						queryConfig,
					);
					returnData.push(res);
				} else {
					returnData.push({ content: 'Invalid operation' });
				}
			} catch (error) {
				if (this.continueOnFail()) {
					items.push({ json: this.getInputData(i)[0].json, error, pairedItem: i });
					returnData.push({ content: error as string });
				} else {
					// Adding `itemIndex` allows other workflows to handle this error
					if (error.context) {
						// If the error thrown already contains the context property,
						// only append the itemIndex
						error.context.itemIndex = i;
						throw error;
					}
					throw new NodeOperationError(this.getNode(), error, {
						itemIndex: i,
					});
				}
			}
		}
		return [this.helpers.returnJsonArray(returnData)];
	}
}
