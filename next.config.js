const withLinaria = require('next-linaria')

const config = {

    generateEtags: false,

    async redirects() {
        return []
    },

    async rewrites() {
        return []
    },

    images: {
        domains: ['firebasestorage.googleapis.com'],
        imageSizes: [760],
    },

    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {

        return config
    },
}

module.exports = withLinaria(config)
