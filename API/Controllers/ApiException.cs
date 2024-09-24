namespace API;
public class ApiException(int statusCode,string message,string? details){
    public int StatusCode{get;set;} = statusCode;
    public string Messagee{get;set;} = message;
    public string? Details {get;set;} = details;
}