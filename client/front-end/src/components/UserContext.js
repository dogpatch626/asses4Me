import React, { createContext, useState, useEffect } from "react";


export const UserContext = createContext({user:localStorage.getItem('user'),  setUser:()=>{}}); 
export const JwtContext = createContext({jwtTok:localStorage.getItem('jwt'), setJwt:()=>{}}); 
export const IdContext = createContext({_id:localStorage.getItem('_id'), setId:()=>{}}); 

