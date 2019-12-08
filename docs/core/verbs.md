# Verbs API

|                                              | firestore               | firebase                | http                   | parse                    |
| -------------------------------------------- | ----------------------- | ----------------------- | ---------------------- | ------------------------ |
| [find](https://docs.reative.dev/core/api)    | ✅                       | ✅                       | ⚙<sub>http.get</sub>   | ✅                        |
| [findOne](https://docs.reative.dev/core/api) | ✅                       | ✅                       | ⚙<sub>http.get</sub>   | ✅                        |
| [on](https://docs.reative.dev/core/api)      | ✅                       | ✅                       | ⛔️                     | ✅                        |
| [get](https://docs.reative.dev/core/api)     | ⚙<sub>http.get</sub>    | ⚙<sub>http.get</sub>    | ✅                      | ⚙<sub>parse.find</sub>   |
| [post](https://docs.reative.dev/core/api)    | ⚙<sub>http.post</sub>   | ⚙<sub>http.post</sub>   | ✅                      | ⚙<sub>parse.find</sub>   |
| [update](https://docs.reative.dev/core/api)  | ✅                       | ⚙<sub>http.patch</sub>  | ⚙<sub>http.patch</sub> | ⚙<sub>parse.update</sub> |
| [patch](https://docs.reative.dev/core/api)   | ⚙<sub>http.patch</sub>  | ⚙<sub>http.patch</sub>  | ✅                      | ⚙<sub>parse.set</sub>    |
| [delete](https://docs.reative.dev/core/api)  | ⚙<sub>http.delete</sub> | ⚙<sub>http.delete</sub> | ✅                      | ⛔️                       |
| [set](https://docs.reative.dev/core/api)     | ✅                       | ⚙<sub>http.post</sub>   | ⚙<sub>http.post</sub>  | ✅                        |


✅ available ⛔️ unavailable ⚙ routed