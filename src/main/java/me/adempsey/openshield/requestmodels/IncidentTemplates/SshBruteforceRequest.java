package me.adempsey.openshield.requestmodels.IncidentTemplates;

import lombok.Data;

@Data
public class SshBruteforceRequest {
    private Long portNumber;
    private String ipAddress;
    private String compromisedUsername;
    private String compromisedPassword;
    private String device;
    private String sshVersion;
}
