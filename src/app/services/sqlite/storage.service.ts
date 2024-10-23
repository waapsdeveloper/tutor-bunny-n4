import { Injectable } from '@angular/core';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { DbnameVersionService } from './dbname-version.service';
import { SQLiteService } from './sqlite.service';
import { UpgradeStatements } from './upgrades/user.upgrade.statements';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  // public userList: BehaviorSubject<User[]> =
  // new BehaviorSubject<User[]>([]);
  private databaseName: string = "";
  private uUpdStmts: UpgradeStatements = new UpgradeStatements();
  private versionUpgrades;
  private loadToVersion;
  private db!: SQLiteDBConnection;
  // private isUserReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqliteService: SQLiteService,
  private dbVerService: DbnameVersionService) {
    this.versionUpgrades = this.uUpdStmts.userUpgrades;
    this.loadToVersion = this.versionUpgrades[this.versionUpgrades.length-1].toVersion;
  }
  async initializeDatabase(dbName: string) {
    this.databaseName = dbName;
    // create upgrade statements
    await this.sqliteService
      .addUpgradeStatement({  database: this.databaseName,
                              upgrade: this.versionUpgrades});
    // create and/or open the database
    this.db = await this.sqliteService.openDatabase(this.databaseName,
                                          false,
                                          'no-encryption',
                                          this.loadToVersion,
                                          false
    );
    this.dbVerService.set(this.databaseName,this.loadToVersion);

    // await this.getUsers();
  }

  async executeQuery(query, params?): Promise<any>{

    const res = (await this.db.query(query, params));
    return res.values;

  }
  // userState() {
  //   return this.isUserReady.asObservable();
  // }
  // fetchUsers(): Observable<User[]> {
  //   return this.userList.asObservable();
  // }


}

