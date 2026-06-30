export function generateError(
    severity, stage, field, reason, rawValue
){
    return {
        severity: severity,
        stage: stage,
        field: field,
        reason: reason,
        rawValue: rawValue
    }
}