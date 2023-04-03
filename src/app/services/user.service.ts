import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService
{

  // Assign API url
  // private REST_API_SERVER = location.origin;
  private REST_API_SERVER = "http://localhost:4000";
  constructor(private httpClient: HttpClient) { }

  /**
   * 
   * This function gets the currently logged in user as string.
   *
   * @returns current user
   */
  public async getUser(): Promise<string>
  {
    let user = "";
    try
    {
      await lastValueFrom(this.httpClient.get(`${this.REST_API_SERVER}/api/user/getLoginUser`, { responseType: "text" })).then(async (data: string) =>
      {
        if (data.includes("\\")) user = data.split("\\")[1];
        else user = data;
      });
    } catch (error)
    {
      console.log(error);
    }
    return user;
  }
}