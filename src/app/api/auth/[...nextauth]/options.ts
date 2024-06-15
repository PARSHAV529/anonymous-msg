import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'
import dbConnect from "@/lib/dbConnection";
import userModel from "@/model/User";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any): Promise<any> {

                await dbConnect()

                try {
                    const user = await userModel.findOne({
                        $or: [
                            { email: credentials.identifier },
                            { username: credentials.identifier }
                        ]
                    })
                    if (!user) {
                        throw new Error('user not found')

                    }

                    if (!user.isVerified) {
                        throw new Error('please verify your account')
                    }

                    const isPasswordComapre = await bcrypt.compare(credentials.password, user.password)

                    if (isPasswordComapre) {
                        return user
                    }
                    else {
                        throw new Error('invalid password')
                    }
                } catch (error: any) {
                    throw new Error(error)

                }

            }
        })],

    pages: {
        signIn: '/signIn'
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.SECRET_KEY,

    callbacks: {
       
        async jwt({ token, user, }) {
            if (user) {
                token._id = user._id?.toString()
                token.username= user.username
                token.isVerified= user.isVerified
                token.isAcceptingMessage= user.isAcceptingMessage
             }
            return token
        }, async session({ session, token }) {
            if(token){
                session.user._id= token._id;
                session.user.isAcceptingMessage= token.isAcceptingMessage
                session.user.isVerified= token.isVerified
                session.user.username= token.username
                
            }
            return session
        },
    }








}