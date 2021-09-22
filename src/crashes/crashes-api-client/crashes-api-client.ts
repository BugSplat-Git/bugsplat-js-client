import { ApiClient, BugSplatResponse } from '../../common';
import { TableDataClient } from '../../common/data/table-data/table-data-client/table-data-client';
import { TableDataRequest } from '../../common/data/table-data/table-data-client/table-data-request';
import { TableDataResponse } from '../../common/data/table-data/table-data-client/table-data-response';
import { CrashesApiRow } from './crashes-api-row';

export class CrashesApiClient {

    private _tableDataClient: TableDataClient;

    constructor(private _client: ApiClient) {
        this._tableDataClient = new TableDataClient(this._client, '/allcrash?data');
    }

    async getCrashes(request: TableDataRequest): Promise<TableDataResponse<CrashesApiRow>> {
        const response = await this._tableDataClient.getData(request);
        const json = await response.json();
        const pageData = json.pageData;
        const rows = json.rows
            .map(row => {
                const newRow = {
                    ...row,
                    ipAddress: row.IpAddress,
                    comments: row.Comments
                };
                delete newRow.IpAddress;
                delete newRow.Comments;
                return newRow;
            });

        return {
            rows,
            pageData
        };
    }

    postNotes(
        database: string,
        id: number,
        notes: string
    ): Promise<BugSplatResponse> {
        const formData = this._client.createFormData();
        formData.append('update', 'true');
        formData.append('database', database);
        formData.append('id', `${id}`);
        formData.append('Comments', notes);

        const init = {
            method: 'POST',
            body: formData,
            cache: 'no-cache',
            credentials: 'include',
            redirect: 'follow'
        };

        return this._client.fetch('/allcrash?data', <RequestInit><unknown>init);
    }
}