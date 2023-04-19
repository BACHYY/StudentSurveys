export default function getURLSearchParam(param: string) {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(param);
  }
  