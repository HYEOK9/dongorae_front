/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    compiler: {
        styledComponents: true,
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });

        return config;
    },
    async rewrites() {
        return [
            {
                source: "/api/feed/search",
                destination: `http://dongore-backend2.herokuapp.com/api/feed/search`,
            },
            {
                source: "/api/user",
                destination: `http://dongore-backend2.herokuapp.com/api/user`,
            },
            {
                source: "/api/user/auth/access",
                destination: `http://dongore-backend2.herokuapp.com/api/user/auth/access`,
            },
        ];
    },
};

module.exports = nextConfig;
