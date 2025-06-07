import dotenv from 'dotenv';
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env:{
        SERVER_URI: process.env.SERVER_URI,
        GEOCODE_KEY: process.env.GEOCODE_KEY,
    }
};

export default nextConfig;
