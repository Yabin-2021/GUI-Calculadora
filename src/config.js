(function() {
    const CONTRACT_NAME = 'react'; /* TODO: fill this in!*/
    const DEFAULT_ENV = 'development'; 
    
    function getConfig(env) {
        switch (env) {
            case 'production':
            case 'development':
                return {
                    networkId: 'default',
                    nodeUrl: 'https://rpc.nearprotocol.com',
                    contractName: CONTRACT_NAME,
                    walletUrl: 'https://wallet.nearprotocol.com',
                    initialBalance: 1000000000000,
                };
            case 'local':
                return {
                    networkId: 'local',
                    nodeUrl: 'http://localhost:3030',
                    walletUrl: 'http://localhost:3000/wallet',
                    contractName: CONTRACT_NAME,
                    initialBalance: 1000000000000,
                };
            case 'test':
                return {
                    networkId: 'local',
                    nodeUrl: 'http://localhost:3030',
                    contractName: CONTRACT_NAME,
                    masterAccount: 'test.near',
                    initialBalance: 100000000,
                };
            case 'test-remote':
            case 'ci':
                return {
                    networkId: 'shared-test',
                    nodeUrl: 'http://shared-test.nearprotocol.com:3030',
                    contractName: CONTRACT_NAME,
                    masterAccount: 'test.near',
                    initialBalance: 100000000,
                };
            default:
                throw Error(`Unconfigured environment '${env}'. Can be configured in src/config.js.`);
        }
    }
    let Cookies = require('js-cookie');
    const cookieConfig = typeof Cookies != 'undefined' && Cookies.getJSON('fiddleConfig');
    if (typeof module !== 'undefined' && module.exports) {
        console.log("module works")
        module.exports = getConfig;
    } else {
        console.log("Cookie works")
        window.nearConfig =  cookieConfig && cookieConfig.nearPages ? cookieConfig : getConfig(DEFAULT_ENV);
    }
})();
