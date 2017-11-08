export class ESNotify {
	info(message: string, time: number, options?): void;
	warning(message: string, time: number, options?): void;
	error(message: string, time: number, options?): void;
}
