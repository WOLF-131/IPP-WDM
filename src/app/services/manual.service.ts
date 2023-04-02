import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { EMPTY, lastValueFrom, Observable } from 'rxjs';
import { Manual } from '../types/manual.type';

@Injectable({
  providedIn: 'root'
})
export class ManualService
{
  // Assign API url
  private REST_API_SERVER = location.origin;
  constructor(private httpClient: HttpClient) { }

  /**
   *
   * This function returns all manuals from the Backend as an array.
   * The manuals do not contain PDF data to make them lightweight.
   *
   * @returns array of all manuals
   */
  public getManuals(): Observable<Manual[]>
  {
    try
    {
      return this.httpClient.get<Manual[]>(`${this.REST_API_SERVER}/api/manual`);
    } catch (error)
    {
      console.log(error);
      return EMPTY;
    }
  }

  /**
   *
   * This function is used to fetch the complete manual with PDF data that corresponds to the given id.
   *
   * @param id Manual Id
   * @returns manual with PDF data
   */
  public async getFullManual(id: number): Promise<Manual>
  {
    try
    {
      return lastValueFrom(this.httpClient.get<Manual>(`${this.REST_API_SERVER}/api/manual/${id}`));
    } catch (error)
    {
      console.log(error);
      return new Promise((resolve, reject) => reject(error));
    }
  }

  /**
   *
   * This function searches all manuals and returns a list of all manuals that fit the search term.
   *
   * @param searchId Search Term
   * @returns List of manuals that fit the search term
   */
  public async searchByMatNr(searchId: number)
  {
    try
    {
      return this.httpClient.get<Manual[]>(`${this.REST_API_SERVER}/api/manual/search/${searchId}`);
    } catch (error)
    {
      console.log(error)
      return EMPTY;
    }
  }

  /**
   *
   * This function creates a new Manual
   *
   * @param manual Manual to be created
   */
  public createManual(manual: Manual)
  {
    try
    {
      this.httpClient.post(`${this.REST_API_SERVER}/api/manual/create`, manual);
    } catch (error)
    {
      console.log(error);
    }
  }

  /**
   *
   * This function updates an already existing manual.
   * The manual must have a matching Id to the one to be updated.
   *
   * @param manual Manual to be updated
   */
  public updateManual(manual: Manual)
  {
    try
    {
      this.httpClient.post(`${this.REST_API_SERVER}/api/manual/update`, manual);
    } catch (error)
    {
      console.log(error);
    }
  }

  /**
   *
   * This function deletes the manual with a matching Id.
   *
   * @param id Id of the manual to be deleted
   */
  public deleteManual(id: number)
  {
    try
    {
      this.httpClient.post(`${this.REST_API_SERVER}/api/manual/delete`, id);
    } catch (error)
    {
      console.log(error);
    }
  }
}
