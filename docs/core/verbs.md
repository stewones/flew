# Verbs API

|                                                                                                                      | firestore               | firebase                | http                   | parse                    |
| -------------------------------------------------------------------------------------------------------------------- | ----------------------- | ----------------------- | ---------------------- | ------------------------ |
| <a href="https://docs.reative.dev/core/api/#records-find-observable-less-than-t-greater-than">find</a>               | ✅                       | ✅                       | ⚙<sub>http.get</sub>   | ✅                        |
| <a href="https://docs.reative.dev/core/api/#records-findone-observable-less-than-t-greater-than">findOne</a>         | ✅                       | ✅                       | ⚙<sub>http.get</sub>   | ✅                        |
| <a href="https://docs.reative.dev/core/api/#records-on-observable-less-than-t-greater-than">on</a>                   | ✅                       | ✅                       | ⛔️                     | ✅                        |
| <a href="https://docs.reative.dev/core/api/#records-get-path-observable-less-than-t-greater-than">get</a>            | ⚙<sub>http.get</sub>    | ⚙<sub>http.get</sub>    | ✅                      | ⚙<sub>parse.find</sub>   |
| <a href="https://docs.reative.dev/core/api/#records-post-path-body-observable-less-than-t-greater-than">post</a>     | ⚙<sub>http.post</sub>   | ⚙<sub>http.post</sub>   | ✅                      | ⚙<sub>parse.find</sub>   |
| <a href="https://docs.reative.dev/core/api/#records-update-data-observable-less-than-t-greater-than">update</a>      | ✅                       | ⚙<sub>http.patch</sub>  | ⚙<sub>http.patch</sub> | ⚙<sub>parse.update</sub> |
| <a href="https://docs.reative.dev/core/api/#records-patch-path-body-observable-less-than-t-greater-than">patch</a>   | ⚙<sub>http.patch</sub>  | ⚙<sub>http.patch</sub>  | ✅                      | ⚙<sub>parse.set</sub>    |
| <a href="https://docs.reative.dev/core/api/#records-delete-path-body-observable-less-than-t-greater-than">delete</a> | ⚙<sub>http.delete</sub> | ⚙<sub>http.delete</sub> | ✅                      | ⛔️                       |
| <a href="https://docs.reative.dev/core/api/#records-set-data-options-observable-less-than-t-greater-than">set</a>    | ✅                       | ⚙<sub>http.post</sub>   | ⚙<sub>http.post</sub>  | ✅                        |


✅ available ⛔️ unavailable ⚙ routed