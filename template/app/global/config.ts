let w: any;

if (typeof window === 'undefined') {
    w = {};
} else {
    w = window;
}

const config = {
    isProduction: false,

    devTools: function(name: string, context: any) {
        if (!this.isProduction) {

            if (typeof w.dbg === 'undefined') {
                w.dbg = {};
            }

            w.dbg[name] = context;
        }
    }
};

export default config;