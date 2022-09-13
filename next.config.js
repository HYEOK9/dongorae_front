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
                source: "/api/:path*",
                destination: `http://dongore-backend2.herokuapp.com/api/:path*`,
            },
            {
                source: "/api/:path*",
                destination: `http://dongore-backend2.herokuapp.com/api/:path*`,
            },
        ];
    },
};

module.exports = nextConfig;
