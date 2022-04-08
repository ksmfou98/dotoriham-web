import { act, renderHook } from "@testing-library/react-hooks";
import useToggle from "hooks/useToggle";

describe("useToggle", () => {
  test("useToggle은 길이가 3인 배열을 리턴한다. (state, onToggle, setState)", () => {
    const { result } = renderHook(() => useToggle(false));
    expect(result.current).toHaveLength(3);
  });

  test("initialValue 값을 넣지 않으면 value의 초기 값은 false 이다.", () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current[0]).toBe(false);
  });

  test("initalValue 값을 true로 넣어주면 value의 초기 값은 true 이다.", () => {
    const { result } = renderHook(() => useToggle(true));
    expect(result.current[0]).toBe(true);
  });

  test("onToggle 함수를 실행하면 value의 값이 바뀐다.", () => {
    const { result } = renderHook(() => useToggle(false));
    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(true);
  });

  test("setValue를 이용해서 직접 value의 값을 바꿀 수 있다.", () => {
    const { result } = renderHook(() => useToggle(false));
    act(() => {
      result.current[2](true);
    });
    expect(result.current[0]).toBe(true);
  });
});
