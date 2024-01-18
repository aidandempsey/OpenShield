package me.adempsey.openshield.utils;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;

public class GetUidFromJWT {
    public static String validateToken(String idToken) throws FirebaseAuthException {
        idToken = idToken.replace("Bearer ", "");
        FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
        return decodedToken.getUid();
    }
}
