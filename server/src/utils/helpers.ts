export const getNameFromEmail = (email: string): string => {
	return email.split("@")[0];
};
