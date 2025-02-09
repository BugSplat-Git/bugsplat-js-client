import { CrashStatus } from '@crash';
import { safeParseJson } from '../../common/parse';

interface CrashData {
  groupByCount: number;
  stackKey: string;
  appName: string;
  appVersion: string;
  crashTypeId: CrashTypeId;
  appDescription: string;
  userDescription: string;
  user: string;
  email: string;
  crashTime: string;
  defectId: string;
  defectUrl: string;
  defectLabel: string;
  status: CrashStatus;
  skDefectId: string;
  skDefectUrl: string;
  skDefectLabel: string;
  skComments: string;
  exceptionCode: string;
  exceptionMessage: string;
}

interface CrashDataWithMappedProperties extends CrashData {
  id: number;
  stackId: number;
  stackKeyId: number;
  comments: string;
  ipAddress: string;
  attributes: Record<string, unknown>;
}

export interface CrashesApiResponseRow extends CrashData {
  id: string;
  stackId: string;
  stackKeyId: string;
  Comments: string;
  IpAddress: string;
  attributes?: string;
}

export enum CrashTypeId {
  unknown = 0,
  windowsNative = 1,
  java = 4,
  crashpad = 6,
  dotnet = 8,
  unity = 12,
  macOS = 13,
  javascript = 14,
  unityNative = 15,
  unrealLinuxServer = 16,
  unreal = 17,
  dotnetStandard = 18,
  angular = 19,
  node = 20,
  xml = 21,
  electron = 22,
  python = 23,
  unityDotNetStandard = 24,
  asan = 25,
  iOS = 26,
  xbox = 27,
  ps4 = 28,
  ps5 = 29,
  playStationRecap = 30,
}

export class CrashesApiRow implements CrashDataWithMappedProperties {
  id: number;
  groupByCount: number;
  status: CrashStatus;
  stackKey: string;
  stackId: number;
  stackKeyId: number;
  appName: string;
  appVersion: string;
  crashTypeId: CrashTypeId;
  appDescription: string;
  userDescription: string;
  user: string;
  email: string;
  ipAddress: string;
  crashTime: string;
  defectId: string;
  defectUrl: string;
  defectLabel: string;
  skDefectId: string;
  skDefectUrl: string;
  skDefectLabel: string;
  comments: string;
  skComments: string;
  exceptionCode: string;
  exceptionMessage: string;
  attributes: Record<string, unknown>;

  constructor(rawApiRow: CrashesApiResponseRow) {
    this.id = Number(rawApiRow.id);
    this.groupByCount = Number(rawApiRow.groupByCount) || 0;
    this.status = Number(rawApiRow.status) as CrashStatus;
    this.stackKey = rawApiRow.stackKey;
    this.stackKeyId = Number(rawApiRow.stackKeyId);
    this.stackId = Number(rawApiRow.stackId);
    this.appName = rawApiRow.appName;
    this.appVersion = rawApiRow.appVersion;
    this.crashTypeId = Number(rawApiRow.crashTypeId) || 0;
    this.appDescription = rawApiRow.appDescription;
    this.userDescription = rawApiRow.userDescription;
    this.user = rawApiRow.user;
    this.email = rawApiRow.email;
    this.ipAddress = rawApiRow.IpAddress;
    this.crashTime = rawApiRow.crashTime;
    this.defectId = rawApiRow.defectId;
    this.defectUrl = rawApiRow.defectUrl;
    this.defectLabel = rawApiRow.defectLabel;
    this.skDefectId = rawApiRow.skDefectId;
    this.skDefectUrl = rawApiRow.skDefectUrl;
    this.skDefectLabel = rawApiRow.skDefectLabel;
    this.comments = rawApiRow.Comments;
    this.skComments = rawApiRow.skComments;
    this.exceptionCode = rawApiRow.exceptionCode;
    this.exceptionMessage = rawApiRow.exceptionMessage;
    this.attributes = safeParseJson(rawApiRow.attributes);

    Object.freeze(this);
  }
}
