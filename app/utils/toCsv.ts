import { stringify } from "csv";

export default async function toCsv(data: any[]): Promise<string> {
  return new Promise((resolve, reject) => {
    stringify(
      data,
      {
        header: true,
      },
      (err, output) => {
        if (err) {
          reject(err);
        } else {
          resolve(output);
        }
      },
    );
  });
}
