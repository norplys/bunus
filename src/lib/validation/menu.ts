// import { z } from 'zod';
// import { isValidYoutubeLink } from '../validation';
// import { currencyFieldSchema, nameFieldSchema } from './common';

// export const productSchema = z.object({
//   name: nameFieldSchema,
//   image: z.string().url().optional(),
//   price: currencyFieldSchema,
//   available: z.boolean(),
//   description: z.union([
//     z.null(),
//     z.literal('').transform(() => null),
//     z
//       .string()
//       .trim()
//       .min(1, { message: 'Deskripsi tidak boleh kosong' })
//       .max(128, { message: 'Deskripsi maksimal 128 karakter' })
//   ]),
//   youtubeLink: z.union([
//     z.null(),
//     z.literal('').transform(() => null),
//     z
//       .string()
//       .trim()
//       .url({ message: 'Link tidak valid' })
//       .max(128, { message: 'Link maksimal 128 karakter' })
//       .refine((url) => isValidYoutubeLink(url), {
//         message: 'Link YouTube tidak valid'
//       })
//   ]),
//   discountPrice: z.union([
//     z.null(),
//     z.nan().transform(() => null),
//     currencyFieldSchema
//   ])
// });

// export type ProductSchema = z.infer<typeof productSchema>;
