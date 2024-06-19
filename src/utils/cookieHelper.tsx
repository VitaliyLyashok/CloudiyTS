interface CookieOptions {
    expires?: number | Date;
    path?: string;
}

const Helper = {
    getCookie(name: string): string | undefined {
        const matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    },
    clearCookies(): void {
        document.cookie.split(";").forEach((c) => {
            document.cookie = c
                .replace(/^ +/, "")
                .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
    },
    setCookie(name: string, value: string, options?: CookieOptions): void {
        const { expires, path } = options || {};
        const defaultExpires = 336;

        const expireDate = expires instanceof Date ? expires : new Date(Date.now() + (expires || defaultExpires) * 1000 * 60 * 60);

        const updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value)
            + (expireDate ? ";expires=" + expireDate.toUTCString() : "")
            + (path ? ";path=" + path : "");

        document.cookie = updatedCookie;
    },
    deleteCookie(name: string): void {
        document.cookie = name + "=;Path=/;Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    }
};

export default Helper;
