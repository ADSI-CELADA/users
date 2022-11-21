import { createPool } from "mysql";

export class Conexion {
  public readonly host?: string | any = "localhost";
  private readonly user?: string | any = "root";
  private readonly password?: string | any = "";
  protected readonly database: string | any = "jwt";
  private readonly charset: string | any = "utf8";
  private readonly port: number | any = 3306;

  public async connect() {
    const connect = createPool({
      host: this.host,
      user: this.user,
      password: this.password,
      database: this.database,
      charset: this.charset,
      port: this.port,
    });
    return connect;
  }
}

export const conexion = new Conexion();
