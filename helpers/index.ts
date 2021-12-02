import cookie from "cookie";
import {IncomingMessage} from "http";

export enum CookieRedirectType {
    Auth,
    Unauth,
}
export function parseCookies(req: IncomingMessage) {
    return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}

export const formatDate = (date: string | Date) => {
    const correctDate = new Date(date);
    const strDate = `${
        correctDate.getUTCDate() < 10
            ? "0" + correctDate.getUTCDate()
            : correctDate.getUTCDate()
    }.${
        correctDate.getUTCMonth() < 10
            ? "0" + correctDate.getUTCMonth()
            : correctDate.getUTCMonth()
    }.${correctDate.getUTCFullYear()}`;
    const strTime = `${
        correctDate.getUTCHours() < 10
            ? "0" + correctDate.getUTCHours()
            : correctDate.getUTCHours()
    }:${
        correctDate.getUTCMinutes() < 10
            ? "0" + correctDate.getUTCMinutes()
            : correctDate.getUTCMinutes()
    }`;
    return `Дата: ${strDate} | Время: ${strTime}`;
};
