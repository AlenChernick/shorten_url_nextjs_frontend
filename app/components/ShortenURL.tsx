'use client';
import { FormEvent, useState, type FC } from 'react';
import { toast } from 'react-hot-toast';
import { useForm } from '@/app/hooks/useForm';
import { shortenURLService } from '@/app/services/shortenURL.service';
import Link from 'next/link';

const ShortenURL: FC = () => {
  const { values, handleChange, resetForm } = useForm({ url: '' });
  const [shortenURL, setShortenURL] = useState<string>('');
  const hasLink = shortenURL.includes('http') ? true : false;

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const shortenUrlServer: string | null = await shortenURLService.getShortenURL(values);

      if (shortenUrlServer) {
        setShortenURL(shortenUrlServer);
        toast.success('Shorten URL Succeeded');
      } else {
        toast.error('URL Does Not Exists');
      }

      resetForm();
    } catch (err) {
      console.error('Failed to shorten:', err);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortenURL);
      toast.success('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <section className='url-shorten-container'>
      <h1 className='url-shorten-title'>Custom URL Shorten</h1>
      <form className='url-shorten-form' onSubmit={handleSubmit}>
        <input
          className='url-shorten-input'
          name='url'
          placeholder='https://example.com'
          pattern='https://.*'
          required
          title='format: https://example.com'
          value={values.url}
          onChange={handleChange}
        />
        <button type='submit' className='url-shorten-btn'>
          Shorten URL
        </button>
      </form>

      {shortenURL && (
        <section className='url-shorten-output'>
          <h2 className='url-shorten-label'>Your Short Link</h2>
          <input className='url-shorten-input' type='text' readOnly value={shortenURL} />
          {hasLink && (
            <section className='url-shorten-btns'>
              <button className='url-shorten-copy-link-btn' onClick={copyToClipboard}>
                Copy Link
              </button>
              <Link className='url-shorten-link' href={shortenURL} title={shortenURL} target='_blank'>
                Browse
              </Link>
            </section>
          )}
        </section>
      )}
    </section>
  );
};

export default ShortenURL;
