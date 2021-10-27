import urlencode from 'urlencode';
import randomstring from 'randomstring';
import hmacSHA1 from 'crypto-js/hmac-sha1';
import Base64 from 'crypto-js/enc-base64';

class TwitterService {
    oauthToken?: string;
    oauthTokenSecret?: string;

    constructor(private readonly consumerKey: string,
                private readonly consumerSecret: string) {
    }

    updateCredentials(oauthToken: string, oauthTokenSecret: string) {

        this.oauthToken = oauthToken;
        this.oauthTokenSecret = oauthTokenSecret;
    }

    request = async (path: string, params: {[key: string]: string | number}, method: string) => {
        if (!this.oauthToken || !this.oauthTokenSecret) {
            throw new Error("Need to be logged in first");
        }
        let baseUrl = 'https://api.twitter.com/1.1' + path;
        let i = 0;
        let authData = [];
        let fullUrl = 'https://cors.bridged.cc/' + baseUrl;
        for (const paramsKey in params) { // {"key1": "value1", "key2": "value2"}   =>   ?key1=value1&key2=value2
            fullUrl += (i === 0 ? '?' : '&') + paramsKey + '=' + params[paramsKey];
            authData.push(urlencode(paramsKey) + '=' + urlencode(params[paramsKey] + ''));
            i++;
        }
        const encodedConsumerKey = urlencode(this.consumerKey);
        const oauthNonce = randomstring.generate();
        const signatureMethod = 'HMAC-SHA1';
        const timestamp = Math.round(Date.now() / 1000);
        const version = '1.0';
        authData.push('oauth_consumer_key=' + encodedConsumerKey);
        authData.push('oauth_nonce=' + oauthNonce);
        authData.push('oauth_signature_method=' + signatureMethod);
        authData.push('oauth_timestamp=' + timestamp);
        authData.push('oauth_token=' + this.oauthToken);
        authData.push('oauth_version=' + version);
        authData.sort((key1, key2) => key1.localeCompare(key2));
        const authDataString = method.toUpperCase()
            + '&' + urlencode(baseUrl)
            + '&' + urlencode(authData.join('&'));

        const signingKey = urlencode(this.consumerSecret) + '&' + urlencode(this.oauthTokenSecret);
        const signature = Base64.stringify(hmacSHA1(authDataString, signingKey));

        const authHeader = 'OAuth oauth_consumer_key="' + encodedConsumerKey + '", '
            + 'oauth_nonce="' + oauthNonce + '", '
            + 'oauth_signature="' + urlencode(signature) + '", '
            + 'oauth_signature_method="' + signatureMethod + '", '
            + 'oauth_timestamp="' + timestamp + '", '
            + 'oauth_token="' + this.oauthToken + '", '
            + 'oauth_version="' + version + '"';
        const config: {
            method: string,
            headers?: {[key: string]: string},
        } = {
            method: method,
            headers: {
                'Authorization': authHeader
            }
        };
        const res = await fetch(fullUrl, config);
        if (res.status === 200) {
            return await res.json()
        } else {
            throw new Error(await res.text());
        }
    }

    async get(path: string, params: {[key: string]: string | number}) {
        return this.request(path, params, 'GET');
    }

    async post(path: string, params: {[key: string]: string | number}) {
        return this.request(path, params, 'POST');
    }

    async getUserTimeline(userId: string, count: number) {
        return await this.get('/statuses/user_timeline.json', {
            user_id: userId,
            count: count,
        });
    }

    async getUser(userId: string) {
        return await this.get('/users/show.json', {
            user_id: userId,
        });
    }

    async getTrend(trendId: number) {
        return await this.get('/trends/place.json', {
            id: trendId,
        })
    }
}

export default TwitterService;