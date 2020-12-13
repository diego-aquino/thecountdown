import useSWR, {
  responseInterface as ResponseInterface,
  keyInterface as KeyInterface,
  ConfigInterface,
} from 'swr';
import axios from 'axios';

async function fetcher<Data>(requestURL: string): Promise<Data> {
  const { data } = await axios.get<Data>(requestURL);

  return data;
}

function useRequest<Data = any, Error = any>(
  requestURL: KeyInterface,
  config?: ConfigInterface<Data, Error>,
): ResponseInterface<Data, Error> {
  const response = useSWR<Data, Error>(requestURL, fetcher, config);

  return response;
}

export default useRequest;
