<?php

namespace App\Models;

use App\Models\Traits\HasStaticLists;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\HasMedia;

class Event extends Model implements HasMedia
{
    use HasFactory;
    use InteractsWithMedia;
    use HasStaticLists;
    use HasSlug;

    protected $guarded = ['id'];

    public const GENDER_MALE = 'male';
    public const GENDER_FEMALE = 'female';
    public const GENDER_ALL = 'all';

    protected $casts = [
        'is_privacy' => 'boolean',
        'confirm_user' => 'boolean',
        'comment_allowed' => 'boolean',
        'chat_allowed' => 'boolean',
        'photos_allowed' => 'boolean',
        'date' => 'boolean',
    ];
    /**
     * @param string|null $columnKey
     * @param string|null $indexKey
     * @return array
     */
    public static function genderList(string $columnKey = null, string $indexKey = null): array
    {
        $records = [
            [
                'key' => self::GENDER_MALE,
                'name' => trans('Жінки'),
            ],
            [
                'key' => self::GENDER_FEMALE,
                'name' => trans('Чоловіки'),
            ],
            [
                'key' => self::GENDER_ALL,
                'name' => trans('Всі'),
            ],
        ];

        return self::staticListBuild($records, $columnKey, $indexKey);
    }

    /**
     * @return string
     */
    public function getGenderStr(): string
    {
        return self::genderList('sex', 'key')[$this->sex] ?? '';
    }

    /**
     * Get the options for generating the slug.
     */
    public function getSlugOptions() : SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function user()
    {
        return $this->belongsToMany(User::class);
    }

    /**
     * Get media collection by its collectionName.
     *
     * @param string         $collectionName
     * @param array|callable $filters
     *
     * @return \Illuminate\Support\Collection
     */
//    public function getMedia(string $collectionName = 'default', $filters = []): Collection;
}
