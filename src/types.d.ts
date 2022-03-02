/*
 * @Author: your name
 * @Date: 2022-03-02 15:36:50
 * @LastEditTime: 2022-03-02 16:23:11
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \use-limu\src\types.d.ts
 */

type StateFace = {
  [propName: any]: any;
};

type SetStateAction<S> = (draft: S) => void;

export function useLimu<S = StateFace>(initialState: S | (() => S)): [S, SetStateAction<S>];

export function useLimuReducer<R = (draft: StateFace, action: any, payload: any) => void, S = StateFace>(
  reducer: R,
  initialState: S | (() => S)
): [S, (action: any, payload: any) => void];
