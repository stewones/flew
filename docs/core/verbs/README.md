# Verbs API

|                                                        | firestore               | firebase                | http                   | parse                    |
| ------------------------------------------------------ | ----------------------- | ----------------------- | ---------------------- | ------------------------ |
| [find](https://docs.reative.dev/core/verbs/find)       | ✅                       | ✅                       | ⚙<sub>http.get</sub>   | ✅                        |
| [findOne](https://docs.reative.dev/core/verbs/findOne) | ✅                       | ✅                       | ⚙<sub>http.get</sub>   | ✅                        |
| [on](https://docs.reative.dev/core/verbs/on)           | ✅                       | ✅                       | ⛔️                     | ✅                        |
| [get](https://docs.reative.dev/core/verbs/get)         | ⚙<sub>http.get</sub>    | ⚙<sub>http.get</sub>    | ✅                      | ⚙<sub>parse.find</sub>   |
| [post](https://docs.reative.dev/core/verbs/post)       | ⚙<sub>http.post</sub>   | ⚙<sub>http.post</sub>   | ✅                      | ⚙<sub>parse.find</sub>   |
| [update](https://docs.reative.dev/core/verbs/update)   | ✅                       | ⚙<sub>http.patch</sub>  | ⚙<sub>http.patch</sub> | ⚙<sub>parse.update</sub> |
| [patch](https://docs.reative.dev/core/verbs/patch)     | ⚙<sub>http.patch</sub>  | ⚙<sub>http.patch</sub>  | ✅                      | ⚙<sub>parse.set</sub>    |
| [delete](https://docs.reative.dev/core/verbs/delete)   | ⚙<sub>http.delete</sub> | ⚙<sub>http.delete</sub> | ✅                      | ⛔️                       |
| [set](https://docs.reative.dev/core/verbs/set)         | ✅                       | ⚙<sub>http.post</sub>   | ⚙<sub>http.post</sub>  | ✅                        |


✅ available ⛔️ unavailable ⚙ routed