import {
	SecretsManagerClient,
	GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

const secret_name = "nexusconjurecom-cloud-api-secret";

const client = new SecretsManagerClient({
	region: "us-east-1",
});

export const getSecret = async () => {
	let response;

	try {
		response = await client.send(
			new GetSecretValueCommand({
				SecretId: secret_name,
				VersionStage: "AWSCURRENT",
			})
		);
	} catch (error) {
		throw error;
	}

	return JSON.parse(response.SecretString || "{}");
};
