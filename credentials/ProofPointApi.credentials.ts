import { IAuthenticateGeneric, ICredentialType, INodeProperties, Icon } from 'n8n-workflow';

export class ProofPointApi implements ICredentialType {
	name = 'proofpoint';
	displayName = 'ProofPoint API';
	documentationUrl = 'https://github.com/Block81838/N8N-nodes-proofpoint-pps-pod-dlp';
	icon: Icon = 'file:proofpoint.svg';
	properties: INodeProperties[] = [
		{
			displayName: 'User Name',
			name: 'username',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
		{
			displayName: 'Proofpoint Domain',
			name: 'domain',
			type: 'string',
			default: 'https://127.0.0.1',
			description: 'The Proofpoint Domain, format: https://xxx.xxx.xxx',
		},
	];

	// This allows the credential to be used by other parts of n8n
	// stating how this credential is injected as part of the request
	// An example is the Http Request node that can make generic calls
	// reusing this credential
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			auth: {
				username: '={{ $credentials.username }}',
				password: '={{ $credentials.password }}',
			},
		},
	};
}
