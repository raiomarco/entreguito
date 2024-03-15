import {
	Company,
	type Package,
	type Update,
	User,
	packageStatus,
} from "@prisma/client";

type OptionalUpdate = Omit<Update, "id" | "packageId" | "location"> & {
	id?: string;
	packageId?: string;
	location?: string;
};
type OptionalPackage = Omit<
	Package,
	| "id"
	| "userId"
	| "name"
	| "description"
	| "forecast"
	| "origin"
	| "destination"
	| "customStatus"
	| "weight"
	| "volumes"
	| "lastUpdate"
> & {
	id?: string;
	history: OptionalUpdate[];
	userId?: string;
	name?: string;
	description?: string;
	forecast?: Date;
	origin?: string;
	destination?: string;
	customStatus?: string;
	weight?: string;
	volumes?: string;
	lastUpdate?: Date;
};

export {
	type OptionalPackage as Package,
	packageStatus,
	Company,
	User,
	type OptionalUpdate as Update,
};
